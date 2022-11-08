import styles from "./Login.module.css";
import logo from "../../assets/img/logo_small.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [nationalCodeInput, setNationalCodeInput] = useState({
    value: "",
    isValid: true,
  });

  const checkIfNumber = (dataInput) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (dataInput !== "" && re.test(dataInput)) {
      return true;
    } else {
      return false;
    }
  };

  const nationalCodeChange = (event) => {
    if (checkIfNumber(event.target.value)) {
      setNationalCodeInput({ value: event.target.value, isValid: true });
    } else {
      setNationalCodeInput({ value: event.target.value, isValid: false });
    }
  };
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
            <input
              className={!nationalCodeInput.isValid ? styles.inputError : null}
              type="text"
              placeholder="کد ملی خود را وارد کنید"
              onChange={nationalCodeChange}
              value={nationalCodeInput.value}
            />
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
