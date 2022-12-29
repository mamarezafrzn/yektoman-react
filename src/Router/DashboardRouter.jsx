import React, { useEffect } from "react";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import DesktopMenu from "../components/Menu/desktopMenu/DesktopMenu";
import Navbar from "../components/Menu/navbar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { grey } from "@mui/material/colors";
import { useCookies } from "react-cookie";
import useAxiosFunction from "../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../apis/axiosBaseWithAuth";
import Logo from "../assets/img/logo_small.png";
import styles from "./DashboardRouter.module.css";
import { useState } from "react";

const DashboardRouter = (props) => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["user"]);
  const [cookie, setCookie, removeCookie] = useCookies("cookie");
  const [userPosts, userError, userLoading, userAxiosFetch] =
    useAxiosFunction();

  useEffect(() => {
    if (!cookies.Token) {
      navigate("/login");
    }
  });
  if (!cookies.Permission == true && userPosts.status == "Success") {
    console.log("checkedd");
    userPosts?.data?.user?.roles.map((item) => {
      item.name == "admin" && setCookies("Permission", true, { path: "/" });
    });
  }
  useEffect(() => {
    fetchUserData();
  }, [window.location]);
  const fetchUserData = () => {
    userAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: "/info",
    });
  };

  if (userError?.error?.response?.data?.meta?.code === 401) {
    removeCookie("Token", { path: "/" });
    removeCookie(["user"], { path: "/" });
    removeCookie("Name", { path: "/" });
    removeCookie("Permission", { path: "/" });
    navigate("/");
  }

  return (
    <React.Fragment>
      <Navbar />
      <DesktopMenu />
      <div style={{ width: "100%" }}>
        <div className={styles.dashboardHeader}>
          <Link to="/">
            <img src={Logo} />
          </Link>
          <div className={styles.headerWelcome}>
            <p>
              <span style={{ color: "magenta" }}>
                {userPosts?.data?.user?.full_name}{" "}
              </span>
              خوش آمدید.
            </p>
            {/* <p>
              اعتبار:
              {userPosts ? userPosts.data?.user?.credit : 0}
              تومان
            </p> */}
            <Link to="/dashboard/notifications">
              <span className={styles.headerNotification}>
                <p
                  data-count={
                    userPosts ? userPosts?.data?.user?.notifications_count : "0"
                  }
                  style={{ marginTop: "-10px" }}
                >
                  <NotificationsIcon sx={{ color: grey[800] }} />
                </p>
              </span>
            </Link>
            <Link to="/dashboard/profile">
              <PersonIcon sx={{ color: grey[800] }} />
            </Link>
          </div>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.menuSlot}></div>
          <Outlet></Outlet>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardRouter;
