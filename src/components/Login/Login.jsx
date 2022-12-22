import styles from "./Login.module.css";
import logo from "../../assets/img/logo_small.png";
import { useEffect, useState } from "react";
import { checkIfNumber } from "../Validation/Validation";
import useAxiosFunction from "../../axiosFetch/useAxiosFunction";
import axios from "../../apis/axiosBase";
import { Link, useNavigate } from "react-router-dom";
import ErrorToast from "../ErrorToast/ErrorToast";
import BackBtn from "../BackBtn/BackBtn";
import { Helmet } from "react-helmet";

const Login = () => {
  const navigate = useNavigate();
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [showError, setShowError] = useState(true);

  const [nationalCodeInput, setNationalCodeInput] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [newUrl, setNewUrl] = useState();
  const [inputError, setInputError] = useState(false);




  const nationalCodeInputChange = (event) => {
    setNationalCodeInput({
      value: event.target.value,
      validation: { isValid: true },
    });
    setInputError(false);
   
  };
  const loginPost = async (url) => {
    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: `/login${url ? url : ""}`,
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

      setShowError(true);

      setNewUrl("/login/with-password");
    } else {
      return;
    }
    if (error.length >= 1) {
      setInputError(true);
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

      setShowError(true);

      setNewUrl("/login/with-code");
    } else {
      return;
    }
    if (error.length >= 1) {
      setInputError(true);
    }
  };

  const onForgetPassword = (event) => {
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
  };

  if (posts.status == "Success") {
    navigate(newUrl, {
      state: { key: posts.data.key, nationalCode: posts.data.national_code },
    });
  }

  const cleanError = () => {
    setShowError(false);
  };
  return (
    <div className={styles["main-container"]}>
      <Helmet>
        <title>یک تومن |‌ ورود</title>
      </Helmet>
      {error.response?.data.status == "failed" && showError == true ? (
        <ErrorToast error={error} cleanError={cleanError} />
        ) : null}
      <div className={styles["card-container"]}>
        <BackBtn/>
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
            {!nationalCodeInput.validation.isValid ||
              (inputError && (
                <p className={styles.errorLine}>کد وارد شده صحیح نمی باشد</p>
              ))}
            <p onClick={onForgetPassword} className={styles.forgetPass}>
              فراموشی رمز عبور
            </p>
            <div className={styles.loginWithBtnContainer}>
              <button onClick={onLoginWithCode} className={styles["login-btn"]}>
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
          <Link to="/register" style={{textAlign:"right",marginTop:"5px",color:"#0000ffc4",paddingRight:"10px",fontSize:"14px"}}>ثبت نام نکرده اید؟ ثبت نام</Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
