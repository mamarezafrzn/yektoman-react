import styles from "./Login.module.css";
import logo from "../../assets/img/logo_small.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["card-container"]}>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="..." className={styles.logo} />
        </div>
        <hr className="hr-dashed m-0" />
        <div className={styles["form-container"]}>
          <form action="" className={styles["login-form"]}>
            <label htmlFor="">کدملی</label>
            <br />
            <input type="text" placeholder="کد ملی خود را وارد کنید" />
            <button type="submit" className={styles["login-btn"]}>
              <Link to="/login/with-code">ورود با رمز یکبار مصرف</Link>
            </button>
            <button type="submit" className={styles["login-btn"]}>
              <Link to="/login/with-password">ورود با رمز عبور</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;