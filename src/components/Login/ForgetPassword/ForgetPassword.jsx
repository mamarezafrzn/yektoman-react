import styles from "../Login.module.css";
import logo from "../../../assets/img/logo_small.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import axios from "../../../apis/axiosBase";
import { useCookies } from "react-cookie";
import ErrorToast from "../../ErrorToast/ErrorToast";
import BackBtn from "../../BackBtn/BackBtn";
import { Helmet } from "react-helmet";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [showError, setShowError] = useState(true);
  const re = /^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/;

  const [codeInput, setCodeInput] = useState({
    value: "",
    validation: { isValid: true, error: "" },
  });

  const [passwordInput, setPasswordInput] = useState({
    value: "",
    validation: { isValid: true, error: "" },
  });

  const [confirmInput, setConfirmInput] = useState({
    value: "",
    validation: { isValid: true, error: "" },
  });

  const codeInputChange = (event) => {
    setCodeInput({
      value: event.target.value,
      validation: { isValid: true, error: "" },
    });
  };
  const passwordInputChange = (event) => {
    setPasswordInput({
      value: event.target.value,
      validation: { isValid: true, error: "" },
    });
  };
  const confirmInputChange = (event) => {
    setConfirmInput({
      value: event.target.value,
      validation: { isValid: true, error: "" },
    });
  };

  const loginPost = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: `/change/password/${location.state.key}`,
      requestConfig: {
        code: codeInput,
        password: passwordInput.value,
        password_confirmation: confirmInput.value,
      },
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (codeInput.value.trim().length <= 0) {
      setCodeInput({
        value: codeInput.value,
        validation: { isValid: false, error: "پر کردن این فیلد ضروری است" },
      });
    } else if (!re.test(passwordInput.value)) {
      setPasswordInput({
        value: passwordInput.value,
        validation: { isValid: false, error: "رمز عبور ساده است" },
      });
    } else if (passwordInput.value !== confirmInput.value) {
      setConfirmInput({
        value: confirmInput.value,
        validation: {
          isValid: false,
          error: "تکرار رمز عبور با رمز عبور مغایرت دارد",
        },
      });
    } else if (
      passwordInput.validation.isValid &&
      confirmInput.validation.isValid &&
      codeInput.validation.isValid
    ) {
      loginPost();
      setShowError(true);
    } else {
      return;
    }
  };

  if (posts.status == "Success") {
    navigate("/login");
  }
  const cleanError = () => {
    setShowError(false);
  };

  return (
    <div className={styles["main-container"]}>
      <Helmet>
        <title>یک تومن |‌ فراموشی رمز</title>
      </Helmet>
      {error.response?.data.status == "failed" && showError == true ? (
        <ErrorToast error={error} cleanError={cleanError} />
      ) : null}
      <div className={styles["card-container"]}>
        <BackBtn />
        <div className={styles["logo-container"]}>
          <img src={logo} alt="..." className={styles.logo} />
        </div>
        <hr className="hr-dashed m-0" />
        <div className={styles["form-container"]}>
          <form action="" onSubmit={onSubmit} className={styles["login-form"]}>
            <label style={{ marginTop: "10px" }} htmlFor="code">
              کد
            </label>
            <br />
            <input
              type="text"
              id="code"
              placeholder="کد ارسال شده"
              value={codeInput.value}
              onChange={codeInputChange}
              className={
                !codeInput.validation.isValid || posts.status == "failed"
                  ? styles.inputError
                  : null
              }
            />
            {!codeInput.validation.isValid && (
              <p className={styles.errorLine}>{codeInput.validation.error}</p>
            )}
            {posts.status == "failed" && (
              <p className={styles.errorLine}>{posts.meta?.message}</p>
            )}

            <label style={{ marginTop: "10px" }} htmlFor="password">
              رمز عبور
            </label>
            <br />
            <input
              id="password"
              className={
                !passwordInput.validation.isValid ? styles.inputError : null
              }
              type="text"
              placeholder="رمز عبور"
              value={passwordInput.value}
              onChange={passwordInputChange}
              style={{ direction: "ltr", textAlign: "right" }}
            />
            {!passwordInput.validation.isValid && (
              <p className={styles.errorLine}>
                {passwordInput.validation.error}
              </p>
            )}

            <label style={{ marginTop: "10px" }} htmlFor="confirm-pass">
              تکرار رمز عبور
            </label>
            <br />
            <input
              id="confirm-pass"
              className={
                !passwordInput.validation.isValid ? styles.inputError : null
              }
              style={{ direction: "ltr", textAlign: "right" }}
              type="text"
              placeholder="تکرار رمز عبور"
              value={confirmInput.value}
              onChange={confirmInputChange}
            />
            {!confirmInput.validation.isValid && (
              <p className={styles.errorLine}>
                {confirmInput.validation.error}
              </p>
            )}

            <button
              type="submit"
              className={styles["login-btn"]}
              style={{ width: "90%" }}
            >
              ثبت
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
