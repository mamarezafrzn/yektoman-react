import styles from "../Login.module.css";
import logo from "../../../assets/img/logo_small.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { checkIfNumber } from "../../Validation/Validation";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import axios from "../../../apis/axiosBase";
import { useCookies } from "react-cookie";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
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
      url: `/login/${location.state.key}/password`,
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
    } else {
      return;
    }
  };
  console.log(posts)

  if (posts.status == "Success") {
    setCookie("Token", posts.data.token_detail.token, { path: "/" });
    // expires:posts.data.token_detail.expires_in
    navigate("/dashboard");
  }

  return (
    <div className={styles["main-container"]}>
      <div className={styles["card-container"]}>
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
              type="text"
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
            <Link style={{textAlign:"left",width:"80%",margin:"0px auto 0px auto"}} to="/forget-password">فراموشی رمز عبور</Link>
            <button type="submit" className={styles["login-btn"]}>
              ورود به سامانه
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
