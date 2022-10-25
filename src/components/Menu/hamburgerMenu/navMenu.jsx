import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import HandshakeIcon from '@mui/icons-material/Handshake';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


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
  font-weight: 500;

  height: 62px;
  display: flex;
  align-items: center;
  cursor: pointer;
  // margin-top:10px;

  a {
    text-decoration: none;
    font-weight: 500;
    color: #777;
    font-size: 17px;
    transition: all 200ms ease-in-out;
  }

  &:hover {
    a {
      color: #000;
    }
  }
`;
const aStyle = {marginRight:"10px"}

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

export function NavMenu({ isOpen }) {
  return (
    <NavMenuContainer>
      <NavList>
        <Link to="#">
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
            <DashboardIcon color="action"/>

            <a style={aStyle} href="#">داشبورد</a>
          </NavLink>
        </Link>
        <Link to="#">
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

            <FormatListBulletedIcon sx={{fontWeight:"bold"}} color="action"/>
            <a style={aStyle} href="#">لیست کاربران</a>
          </NavLink>
        </Link>
        <Link to="#">
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
            <AddIcon color="action"/>
            <a style={aStyle} href="#"> ایجاد طرح</a>
          </NavLink>
        </Link>
        <Link to="#">
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
            <HandshakeIcon color="action"/>
            <a style={aStyle} href="#">پیوستن به طرح</a>
          </NavLink>
        </Link>
        <Link to="#">
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
            <NotificationsIcon color="action"/>
            <a style={aStyle} href="#">اعلانات</a>
          </NavLink>
        </Link>
        <Link to="#">
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
           <AttachMoneyIcon color="action"/>
            <a style={aStyle} href="#">پرداختی ها</a>
          </NavLink>
        </Link>
        <Link to="#">
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
             <PersonIcon color="action"/>
            <a style={aStyle} href="#"> پروفایل</a>
          </NavLink>
        </Link>
        <Link to="#">
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
            <SettingsIcon color="action"/>
            <a style={aStyle} href="#"> تنظیمات</a>
          </NavLink>
        </Link>
        <Link to="#">
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
            <LogoutIcon color="action"/>
            <a style={aStyle} href="#"> خروج</a>
          </NavLink>
        </Link>
      </NavList>
    </NavMenuContainer>
  );
}
