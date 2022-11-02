import React from "react";
import Card from "../../UI/Card/Card";
import styles from "./Profile.module.css";

import idCard from "../../../assets/img/jokes-13th-1.jpg"

const Profile = (props) => {
  const profileFileInput = React.useRef(null);
  const idCardFileInput = React.useRef(null);
  const certificateFileInput = React.useRef(null);

  const onProfileFileInputClick = (event) => {
    event.preventDefault();
    profileFileInput.current.click();
  };
  const onIdCardFileInputClick = (event) => {
    event.preventDefault();
    idCardFileInput.current.click();
  };
  const onCertificateFileInputClick = (event) => {
    event.preventDefault();
    certificateFileInput.current.click();
  };

  return (
    <React.Fragment>
      <Card
        heading="پروفایل "
        description="نمایش و ویرایش اطلاعات شخصی"
        containerStyle={{ width: "50%" }}
      >
        <form className={styles.newForm}>
          <div className={styles.formHorizontal}>
            <label>
              نام و نام خانوادگی
              <input type="text" />
            </label>
            <label>
              پسن الکترونیک
              <input type="text" />
            </label>
            <label>
              موبایل
              <input type="text" />
            </label>
          </div>
          <div className={styles.formVertical}>
            <label>
              شماره کارت بانکی
              <input type="text" />
            </label>
            <label>
              شماره حساب بانکی
              <input type="text" />
            </label>
            <label>
              شماره شبا بانکی
              <input type="text" />
            </label>
            <label>
              <button className={styles.fileBtn} onClick={onProfileFileInputClick}>عکس پروفایل</button>
              <input ref={profileFileInput} type="file" hidden />
            </label>
            <label>
              <button className={styles.fileBtn} onClick={onIdCardFileInputClick}> عکس کارت ملی</button>
              <input type="file" ref={idCardFileInput} hidden />
            </label>
            <label>
              <button className={styles.fileBtn} onClick={onCertificateFileInputClick}>
                عکس شناسنامه
              </button>
              <input ref={certificateFileInput} type="file" hidden />
            </label>
            <button type="submit" className={styles.submitBtn}>
              به روز رسانی
            </button>
          </div>
        </form>
      </Card>
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <div className={styles.headerTitle}>
            <h1 className={styles.heading}>{props.heading}</h1>
            <h4 className={styles.description}>{props.description}</h4>
          </div>
        </div>
        <div className={styles.cardBody}>
            <div className={styles.userInfo}>
                <p className={styles.userHeader}>شهریار</p>
                <p>شماره موبایل: 11111111111</p>
                <p>کد ملی: 111111111</p>
            </div>
            <div className={styles.cardPics}>
                <div >
                    <p>عکس کارت ملی</p>
                    <img src={idCard} alt="id card"/>
                    
                </div>
                <div>
                    <p> عکس شناسنامه</p>
                    <img src={idCard} alt="id card"/>
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
