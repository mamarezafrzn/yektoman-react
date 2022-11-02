import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import DesktopMenu from "../components/Menu/desktopMenu/DesktopMenu";
import Navbar from "../components/Menu/navbar";

import styles from "./DashboardRouter.module.css";

const DashboardRouter = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <DesktopMenu />
      <div className={styles.gridContainer}>
        <div className={styles.menuSlot}></div>
          <Outlet/>
      </div>
    </React.Fragment>
  );
};

export default DashboardRouter;
