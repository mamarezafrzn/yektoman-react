import React from "react";
import DesktopMenu from "../Menu/desktopMenu/DesktopMenu";
import Navbar from "../Menu/navbar";
import Card from "../UI/Card/Card";
import styles from "./Dashboard.module.css";

import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {grey} from '@mui/material/colors';

const Dashboard = () => {
  return (
    <React.Fragment>
      <Navbar />
      <DesktopMenu />

      <Card heading="داشبورد" description="لیست صندوق های شما">
        <div className={styles.cardItemContainer}>
          <div className={styles.cardItemBody}>
            <div className={styles.mainDescription}>
              <div className={styles.mainDescriptionHeading}>
                <p className={styles.cardHeading}>تست</p>
                <p className={styles.headingDescription}>سر گروه: شهریار</p>
              </div>
              <div className={styles.cardDetails}>
                <p>مبلغ کل: ۱۰۰,۰۰۰,۰۰۰ تومان</p>
                <p>وام ماهیانه: ۱۰,۰۰۰,۰۰۰ تومان</p>
                <p>تهداد نفرات: ۱۰ نفر</p>
                <p>تعداد قرعه کشی انجام شده: ۰</p>
                <p>تاریخ قرعه کشی: تست</p>
                <p>اخرین دریافت کننده وام علی بکماز</p>
              </div>
              <div className={styles.btnContainer}>
                <button className={styles.membersModalBtn}>لیست اعضا</button>
                <button className={styles.warningBtn}><WarningIcon sx={{color: grey[100]}}/></button>
                <button className={styles.trashBtn}><DeleteIcon sx={{color: grey[100]}}/></button>
              </div>
            </div>
            <div className={styles.editBtnContainer}>
              <button className={styles.editBtn}><EditIcon sx={{color: grey[100]}}/></button>
            </div>
          </div>
          <div className={styles.cardItemFooter}>
            <p><CalendarMonthIcon fontSize="small"/> شروع ۱۱/۱۱/۱۱</p>
            <p><CalendarMonthIcon fontSize="small"/> پایان ۱۲/۲۱/۱۲</p>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Dashboard;
