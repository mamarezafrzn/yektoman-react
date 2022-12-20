import styles from "./Login.module.css";
import logo from "../../assets/img/logo_small.png";
import { checkIfNumber } from "../Validation/Validation";
import useAxiosFunction from "../../axiosFetch/useAxiosFunction";
import axios from "../../apis/axiosBase";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ErrorToast from "../ErrorToast/ErrorToast";
import BackBtn from "../BackBtn/BackBtn";

const RegisterVerification = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [counter, setCounter] = useState(120);
  const [resetCounter, setResetCounter] = useState(false);
  const [sendKey, setSendKey] = useState(location.state.key);
  const [showError,setShowError] = useState(true)

  const [codeInput, setCodeInput] = useState({
    value: "",
    validation: { isValid: true },
  });
  const startTimer = () => {
    if (resetCounter) {
      setCounter(120);
      setResetCounter(false);
      clearTimeout();
    } else {
      setCounter(counter - 1);
    }
  };

  useEffect(() => {
    counter > 0 && setTimeout(() => startTimer(), 1000);

    // clearTimeout();
  }, [counter, resetCounter]);
  function fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  const sendCodeAgain = async () => {
    if (counter <= 0) {
      setResetCounter(true);
      setCounter(120);
      var postBody = {
        mobile: location.state.mobile,
        time_spend: true,
        key: sendKey,
      };

      const response = await fetch(
        `https://ws.yektoman.ir/api/v1/register/send/again`,
        {
          body: JSON.stringify(postBody),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status == "Success") {
        const data = response.json();
        setSendKey(data.data.key);
      }
    }
  };

  const codeInputChange = (event) => {
    setCodeInput({ value: event.target.value, validation: { isValid: true } });
  };

  const postCode = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: `register/verification/${location.state.mobile}/${location.state.key}`,
      requestConfig: {
        code: codeInput.value,
      },
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setCodeInput({ ...codeInput, validation: checkIfNumber(codeInput.value) });
    if (codeInput.validation.isValid) {
      postCode();
      setShowError(true)
    } else {
      return;
    }
  };

  if (posts.status == "Success") {
    setCookie("Name", posts.data.user.name, { path: "/" });
    setCookie("Family", posts.data.user.family, { path: "/" });
    setCookie("Token", posts.data.token_detail.token, { path: "/" });
    // expires:posts.data.token_detail.expires_in
    navigate("/dashboard");
  }

  const cleanError=()=>{
    setShowError(false)
  }

  return (
    <div className={styles["main-container"]}>
      {error.response?.data.status == "failed" && showError==true ? (
        <ErrorToast error={error} cleanError={cleanError}/>
      ) : null}
      <div className={styles["card-container"]} style={{height:"auto"}}>
        <BackBtn/>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="..." className={styles.logo} />
        </div>
        <hr className="hr-dashed m-0" />
        <div className={styles["form-container"]}>
          <form
            action=""
            onSubmit={onFormSubmit}
            className={styles["login-form"]}
          >
            <label htmlFor="">کد ارسال شده به موبایل خود را وارد کنید</label>
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
            {!codeInput.validation.isValid ||
              (error.length >= 1 && (
                <p className={styles.errorLine}>کد وارد شده صحیح نمی باشد</p>
              ))}
            <p
              onClick={sendCodeAgain}
              className={counter <= 0 ? styles.sendAgain : styles.sendInvalid}
            >
              {" "}
              ارسال مجدد کد {fmtMSS(counter)}
            </p>
            <button type="submit" className={styles["login-btn"]}>
              تکمیل ثبت نام
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterVerification;
