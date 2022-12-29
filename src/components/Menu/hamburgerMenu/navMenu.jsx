import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import HandshakeIcon from "@mui/icons-material/Handshake";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCookies } from "react-cookie";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import styles from "./navMenu.module.css";

const NavMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NavList = styled.ul`
  padding: 0 0.8em;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NavLink = styled(motion.li)`
  font-weight: 600;

  height: 62px;
  display: flex;
  align-items: center;
  cursor: pointer;
  // margin-top:10px;

  Link {
    text-decoration: none;
    font-weight: 500;
    color: #666;
    font-size: 17px;
    transition: all 200ms ease-in-out;
  }

  &:hover {
    Link {
      color: black;
      font-weight: 800;
    }
  }
`;

const variants = {
  show: {
    transform: "translateX(0em)",
    opacity: 1,
  },
  hide: {
    transform: "translateX(5em)",
    opacity: 0,
  },
};

export function NavMenu({ isOpen,permission }) {


  const [cookie, setCookie, removeCookie] = useCookies();
  const [logOutPosts, logOutError, logOutLoading, logOutAxiosFetch] =
    useAxiosFunction();

  const onLogOut = () => {
    logOutAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "post",
      url: "/logout",
    });
    removeCookie("Token");
    removeCookie(["user"]);
    removeCookie("Name");
  };

  return (
    <NavMenuContainer>
      <NavList>
        <p className={styles.details} style={{ fontWeight: "700" }}>
          <span style={{ color: "violet" }}>{cookie.Name} </span>خوش آمدید.
        </p>
        <p className={styles.details}>اعتبار: ۰ تومان</p>

        <NavLink
          initial={false}
          animate={isOpen ? "show" : "hide"}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.3, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.05, duration: 0.05 },
            },
          }}
        >
          <DashboardIcon color="action" />

          <Link className={styles.links} to="/dashboard">
            داشبورد
          </Link>
        </NavLink>

        {permission == true && (
          <NavLink
            initial={false}
            animate={isOpen ? "show" : "hide"}
            variants={{
              show: {
                ...variants.show,
                transition: { delay: 0.4, duration: 0.2 },
              },
              hide: {
                ...variants.hide,
                transition: { delay: 0.1, duration: 0.05 },
              },
            }}
          >
            <FormatListBulletedIcon
              sx={{ fontWeight: "bold" }}
              color="action"
            />
            <Link className={styles.links} to="/dashboard/user-list">
              لیست کاربران
            </Link>
          </NavLink>
        )}

        <NavLink
          initial={false}
          animate={isOpen ? "show" : "hide"}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.5, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.15, duration: 0.05 },
            },
          }}
        >
          <AddIcon color="action" />
          <Link className={styles.links} to="/dashboard/create-coffer">
            {" "}
            ایجاد طرح
          </Link>
        </NavLink>

        <NavLink
          initial={false}
          animate={isOpen ? "show" : "hide"}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.6, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.2, duration: 0.05 },
            },
          }}
        >
          <HandshakeIcon color="action" />
          <Link className={styles.links} to="/dashboard/join">
            پیوستن به طرح
          </Link>
        </NavLink>

        <NavLink
          initial={false}
          animate={isOpen ? "show" : "hide"}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.7, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.25, duration: 0.05 },
            },
          }}
        >
          <NotificationsIcon color="action" />
          <Link className={styles.links} to="/dashboard/notifications">
            اعلانات
          </Link>
        </NavLink>

        <NavLink
          initial={false}
          animate={isOpen ? "show" : "hide"}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.8, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.3, duration: 0.05 },
            },
          }}
        >
          <AttachMoneyIcon color="action" />
          <Link className={styles["links"]} to="/dashboard/transactions">
            پرداختی ها
          </Link>
        </NavLink>

        <NavLink
          initial={false}
          animate={isOpen ? "show" : "hide"}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.8, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.3, duration: 0.05 },
            },
          }}
        >
          <PersonIcon color="action" />
          <Link className={styles.links} to="/dashboard/profile">
            {" "}
            پروفایل
          </Link>
        </NavLink>

        {permission == true && (
          <NavLink
            initial={false}
            animate={isOpen ? "show" : "hide"}
            variants={{
              show: {
                ...variants.show,
                transition: { delay: 0.8, duration: 0.2 },
              },
              hide: {
                ...variants.hide,
                transition: { delay: 0.3, duration: 0.05 },
              },
            }}
          >
            <SettingsIcon color="action" />
            <Link className={styles.links} to="/dashboard/settings">
              {" "}
              تنظیمات
            </Link>
          </NavLink>
        )}

        <NavLink
          initial={false}
          animate={isOpen ? "show" : "hide"}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.8, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.3, duration: 0.05 },
            },
          }}
        >
          <LogoutIcon color="action" />
          <Link className={styles.links} to="/" onClick={onLogOut}>
            {" "}
            خروج
          </Link>
        </NavLink>
      </NavList>
    </NavMenuContainer>
  );
}
