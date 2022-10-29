import React from "react";
import DesktopMenu from "../../Menu/desktopMenu/DesktopMenu";
import Navbar from "../../Menu/navbar";
import Card from "../../UI/Card/Card";

import styles from "./Join.module.css"

const Join = () => {
  return (
    <React.Fragment>
      <Navbar />
      <DesktopMenu />
      <Card heading="پیوستن به طرح" description="پس از جست و جو به طرح خود بپیوندید">
      <form className={styles.searchForm}>
      <label>
           جست  و جوی طرح
            <input type="text"/>
          </label>
          <button className={styles.searchBtn} type="submit">جست و جو</button>
      </form>
      </Card>
    </React.Fragment>
  );
};

export default Join;
