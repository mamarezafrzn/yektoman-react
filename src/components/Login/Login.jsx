import styles from "./Login.module.css";
import logo from "../../assets/img/logo_small.png";
import { useState } from "react";
import { checkIfNumber } from "../Validation/Validation";
import useAxiosFunction from "../../axiosFetch/useAxiosFunction";
import axios from "../../apis/axiosBase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [nationalCodeInput, setNationalCodeInput] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [newUrl, setNewUrl] = useState();

  const nationalCodeInputChange = (event) => {
    setNationalCodeInput({
      value: event.target.value,
      validation: { isValid: true },
    });
  };
  const loginPost = (url) => {
    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: `/change/password/${url ? url : ""}`,
      requestConfig: {
        national_code: nationalCodeInput.value,
      },
    });
  };
  const forgetPass = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: "/forget/password",
      requestConfig: {
        national_code: nationalCodeInput.value,
      },
    });
  };

  const onLoginWithPassword = (event) => {
    event.preventDefault();
    setNationalCodeInput({
      ...nationalCodeInput,
      validation: checkIfNumber(nationalCodeInput.value),
    });
    if (nationalCodeInput.validation.isValid) {
      loginPost();
      setNewUrl("/login/with-password");
    } else {
      return;
    }
  };
  const onLoginWithCode = (event) => {
    event.preventDefault();
    setNationalCodeInput({
      ...nationalCodeInput,
      validation: checkIfNumber(nationalCodeInput.value),
    });
    if (nationalCodeInput.validation.isValid) {
      loginPost("/sms");
      setNewUrl("/login/with-code");
    } else {
      return;
    }
  };

  const onForgetPassword = (event) =>{
    event.preventDefault();
    setNationalCodeInput({
      ...nationalCodeInput,
      validation: checkIfNumber(nationalCodeInput.value),
    });
    if (nationalCodeInput.validation.isValid) {
      forgetPass();
      setNewUrl("/forget-password");
    } else {
      return;
    }
  }

  if (posts.status == "Success") {
    navigate(newUrl, { state: { key: posts.data.key,nationalCode: posts.data.national_code } });
  }

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
              className={
                !nationalCodeInput.validation.isValid ? styles.inputError : null
              }
              type="text"
              placeholder="کد ملی خود را وارد کنید"
              onChange={nationalCodeInputChange}
              value={nationalCodeInput.value}
            />
            {!nationalCodeInput.validation.isValid && (
              <p className={styles.errorLine}>کد وارد شده صحیح نمی باشد</p>
            )}
            <p onClick={onForgetPassword} className={styles.forgetPass}>فراموشی رمز عبور</p>
            <div className={styles.loginWithBtnContainer}>
            <button
              onClick={onLoginWithCode}
              className={styles["login-btn"]}
            >
              ورود با رمز یکبار مصرف
            </button>
            <button
              onClick={onLoginWithPassword}
              type="submit"
              className={styles["login-btn"]}
            >
              ورود با رمز عبور
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
