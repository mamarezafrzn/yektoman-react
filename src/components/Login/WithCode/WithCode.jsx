import styles from "../Login.module.css";
import withCodeStyle from "./WithCode.module.css";
import logo from "../../../assets/img/logo_small.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkIfNumber } from "../../Validation/Validation";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import axios from "../../../apis/axiosBase";
import { useCookies } from "react-cookie";
import ErrorToast from "../../ErrorToast/ErrorToast";
import BackBtn from "../../BackBtn/BackBtn";
import { Helmet } from "react-helmet";

const WithCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [counter, setCounter] = useState(120);
  const [resetCounter, setResetCounter] = useState(false);
  const [showError, setShowError] = useState(true);
  const [codeInput, setCodeInput] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const startTimer = () => {
    if (resetCounter) {
      setCounter(20);
      setResetCounter(false);
      clearTimeout();
    } else {
      setCounter(counter - 1);
    }
  };

  useEffect(() => {
    // console.log("rerender")
    counter > 0 && setTimeout(() => startTimer(), 1000);

    // clearTimeout();
  }, [counter, resetCounter]);
  function fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  const codeInputChange = (event) => {
    setCodeInput({
      value: event.target.value,
      validation: { isValid: true },
    });
  };

  const loginPost = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: `/login/${location.state.nationalCode}/verify`,
      requestConfig: {
        code: codeInput.value,
      },
    });
  };

  const sendCodeAgain = async () => {
    if (counter <= 0) {
      setResetCounter(true);
      setCounter(120);
      var postBody = {
        national_code: location.state.nationalCode,
        time_spend: true,
      };

      const response = await fetch(
        `https://ws.yektoman.ir/api/v1/login/${location.state.nationalCode}/send/again/${location.state.key}`,
        {
          body: JSON.stringify(postBody),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setCodeInput({
      ...codeInput,
      validation: checkIfNumber(codeInput.value),
    });

    if (codeInput.validation.isValid) {
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
  const cleanError = () => {
    setShowError(false);
  };
  return (
    <div className={styles["main-container"]}>
      <Helmet>
        <title>یک تومن |‌ ورود - با رمز یکبار مصرف</title>
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
            <label htmlFor="">کد دریافتی را وارد کنید</label>
            <br />
            <input
              className={
                !codeInput.validation.isValid ? styles.inputError : null
              }
              type="text"
              placeholder="کد تایید"
              onChange={codeInputChange}
              value={codeInput.value}
            />
            {!codeInput.validation.isValid && (
              <p className={styles.errorLine}>کد وارد شده صحیح نمی باشد</p>
            )}
            <p
              onClick={sendCodeAgain}
              className={
                counter <= 0
                  ? withCodeStyle.sendAgain
                  : withCodeStyle.sendInvalid
              }
            >
              {" "}
              ارسال مجدد کد {fmtMSS(counter)}
            </p>
            <button
              type="submit"
              className={styles["login-btn"]}
              style={{ width: "70%" }}
            >
              ورود به سامانه
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithCode;
