import { Link, useLocation } from "react-router-dom";
import styles from "./DesktopMenu.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import HandshakeIcon from "@mui/icons-material/Handshake";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const DesktopMenu = (props) => {
  const [cookie, setCookie, removeCookie] = useCookies("cookie");
  const [cookies, setCookies] = useCookies(["user"]);
  const navigate = useNavigate();
  const [logOutPosts, logOutError, logOutLoading, logOutAxiosFetch] =
    useAxiosFunction();
  const [userPosts, userError, userLoading, userAxiosFetch] =
    useAxiosFunction();
  const [permission, setPermission] = useState();

  const onLogOut = () => {
    logOutAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "post",
      url: "/logout",
    });
  };

  useEffect(() => {
    fetchUserData();
  }, [cookies.Permission, window.location]);

  if (!permission == true && userPosts.status == "Success") {
    userPosts?.data?.user?.roles.map((item) => {
      item.name == "admin" && setPermission(true);
    });
  }

  const fetchUserData = () => {
    userAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: "/info",
    });
  };

  if (logOutPosts.status == "Success") {
    removeCookie("Token", { path: "/" });
    removeCookie(["user"], { path: "/" });
    removeCookie("Name", { path: "/" });
    removeCookie("Permission", { path: "/" });
    navigate("/");
  }

  return (
    <div className={styles.menuContainer}>
      <h2 className={styles.heading}>صندوق قرض الحسنه</h2>
      <div className={styles.itemsContainer}>
        <Link to="/dashboard">
          <div className={styles.menuItems}>
            <h3 className={styles.menuHeadings}>داشبورد</h3>
            <DashboardIcon color="action" />
          </div>
        </Link>
        {permission && (
          <Link to="/dashboard/user-list">
            <div className={styles.menuItems}>
              <h3 className={styles.menuHeadings}>لیست کاربران</h3>
              <FormatListBulletedIcon
                sx={{ fontWeight: "bold" }}
                color="action"
              />
            </div>
          </Link>
        )}
        <Link to="/dashboard/create-coffer" state="create">
          <div className={styles.menuItems}>
            <h3 className={styles.menuHeadings}>ایجاد طرح</h3>
            <AddIcon color="action" />
          </div>
        </Link>
        <Link to="/dashboard/join">
          <div className={styles.menuItems}>
            <h3 className={styles.menuHeadings}>پیوستن به طرح</h3>
            <HandshakeIcon color="action" />
          </div>
        </Link>
        <Link to="/dashboard/notifications">
          <div className={styles.menuItems}>
            <h3 className={styles.menuHeadings}>اعلانات</h3>
            <NotificationsIcon color="action" />
          </div>
        </Link>
        <Link to="/dashboard/transactions">
          <div className={styles.menuItems}>
            <h3 className={`${styles.menuHeadings}`}>پرداختی ها</h3>
            <AttachMoneyIcon color="action" />
          </div>
        </Link>
        <Link to="/dashboard/profile">
          <div className={styles.menuItems}>
            <h3 className={styles.menuHeadings}>پروفایل</h3>
            <PersonIcon color="action" />
          </div>
        </Link>
        {permission && (
          <Link to="/dashboard/settings">
            <div className={styles.menuItems}>
              <h3 className={styles.menuHeadings}>تنظیمات</h3>
              <SettingsIcon color="action" />
            </div>
          </Link>
        )}
        {/* <Link to="/"  > */}
        <div className={styles.menuItems} onClick={onLogOut}>
          <h3 className={styles.menuHeadings}>خروج</h3>
          <LogoutIcon color="action" />
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default DesktopMenu;
