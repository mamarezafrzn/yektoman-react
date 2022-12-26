import styles from "../Login.module.css";
import logo from "../../../assets/img/logo_small.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { checkIfNumber } from "../../Validation/Validation";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import axios from "../../../apis/axiosBase";
import { useCookies } from "react-cookie";
import ErrorToast from "../../ErrorToast/ErrorToast";
import BackBtn from "../../BackBtn/BackBtn";
import { Helmet } from "react-helmet";

const WithPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [showError, setShowError] = useState(true);
  const [passwordInput, setPasswordInput] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const passwordInputChange = (event) => {
    setPasswordInput({
      value: event.target.value,
      validation: { isValid: true },
    });
  };

  const loginPost = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: `/login/${location.state.nationalCode}/password`,
      requestConfig: {
        password: passwordInput.value,
      },
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setPasswordInput({
      ...passwordInput,
      validation: checkIfNumber(passwordInput.value),
    });

    if (passwordInput.validation.isValid) {
      loginPost();
      setShowError(true);
    } else {
      return;
    }
  };


  if (posts.status == "Success") {
    debugger
    setCookie("Token", posts.data.token_detail.token, { path: "/" });
    setCookie("Name", posts.data.user.name, { path: "/" });
    // expires:posts.data.token_detail.expires_in
    navigate("/dashboard");
  }
  console.log(posts)
  const cleanError = () => {
    setShowError(false);
  };
  return (
    <div className={styles["main-container"]}>
      <Helmet>
        <title>یک تومن |‌ ورود - با رمز عبور</title>
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
            <label htmlFor="">رمز عبور خود را وارد کنید</label>
            <br />
            <input
              className={
                !passwordInput.validation.isValid ? styles.inputError : null
              }
              type="password"
              placeholder="رمز عبور"
              value={passwordInput.value}
              onChange={passwordInputChange}
            />
            {!passwordInput.validation.isValid && (
              <p className={styles.errorLine}>کد وارد شده صحیح نمی باشد</p>
            )}
            {posts.status == "failed" && (
              <p className={styles.errorLine}>{posts.meta.message}</p>
            )}

            <button type="submit" className={styles["login-btn"]}>
              ورود به سامانه
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithPassword;
