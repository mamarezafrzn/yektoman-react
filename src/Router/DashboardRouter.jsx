import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import DesktopMenu from "../components/Menu/desktopMenu/DesktopMenu";
import Navbar from "../components/Menu/navbar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { grey } from "@mui/material/colors";

import Logo from "../assets/img/logo_small.png";

import styles from "./DashboardRouter.module.css";

const DashboardRouter = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <DesktopMenu />
      <div style={{ width: "100%" }}>
        <div className={styles.dashboardHeader}>
          <img src={Logo} />
          <div className={styles.headerWelcome}>
            <p>
              <span style={{ color: "magenta" }}>شهریار</span>
              خوش آمدید.
            </p>
            <p>
              اعتبار:
              <br />
              ۰
              <br />
              تومان
            </p>
            <span className={styles.headerNotification}>
              <p>
                <NotificationsIcon sx={{ color: grey[800] }} />
              </p>
            </span>
            <PersonIcon sx={{ color: grey[800] ,marginTop:"10px"}} />
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
