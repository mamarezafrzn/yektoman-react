// import styles from "../Login.module.css";
import styles from "../Login/Login.module.css";
import logo from "../../assets/img/logo_small.png";
import { Helmet } from "react-helmet";

const Verify = () => {
  return (
    <div className={styles["main-container"]}>
      <Helmet>
      <title>یک تومن |‌ ورود - تایید شماره</title>
      </Helmet>
      <div className={styles["card-container"]}>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="..." className={styles.logo} />
        </div>
        <hr className="hr-dashed m-0" />
        <div className={styles["form-container"]}>
          <form action="" className={styles["login-form"]}>
            <label htmlFor="">کد دریافتی را وارد کنید</label>
            <br />
            <input type="text" placeholder="کد تایید" />
            {/* <button type="submit" className={styles["login-btn"]}>
              ورود با رمز یکبار مصرف
            </button> */}
            <button type="submit" className={styles["login-btn"]}>
              تایید شماره همراه
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
