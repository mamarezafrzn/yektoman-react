import React, { useState } from "react";
import DesktopMenu from "../../Menu/desktopMenu/DesktopMenu";
import Navbar from "../../Menu/navbar";
import Card from "../../UI/Card/Card";
import styles from "./NewCoffer.module.css";

const Newcoffer = () => {
  return (
    <React.Fragment>
      <Navbar />
      <DesktopMenu />

      <Card heading="ایجاد صندوق جدید" description="افتتاح صندوق قرض الحسنه">
        <form className={styles.newForm}>
          <label>
            نام صندوق
            <input type="text"/>
          </label>
          <label>
            مبلغ ماهیانه اقساط
            <input type="text"/>
          </label>
          <label>
            تعداد اعضا
            <input type="text"/>
          </label>
          <label>
            تاریخ شروع
            <input type="text"/>
          </label>
          <label>
            قرعه کشی هر چند روز
            <input type="text"/>
          </label>
          <div className={styles.chackboxContainer}>
            <label style={{display:"flex"}} >
              صندوق با امتیاز
              <input style={{margin:"0px"}} type="checkbox"/>
            </label>
            <label style={{display:"flex"}}>
              نفر اول سرگروه
              <input style={{margin:"0px"}} type="checkbox"/>
            </label>
          </div>
          <button type="submit" className={styles.submitBtn}>
            ایجاد
          </button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Newcoffer;
