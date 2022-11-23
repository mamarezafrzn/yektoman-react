import styles from "./Login.module.css";
import logo from "../../assets/img/logo_small.png";
import { checkIfNumber } from "../Validation/Validation";
import useAxiosFunction from "../../axiosFetch/useAxiosFunction";
import axios from "../../apis/axiosBase";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const RegisterVerification = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [counter, setCounter] = useState(150);

  const [codeInput, setCodeInput] = useState({
    value: "",
    validation: { isValid: true },
  });

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  function fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  const sendCodeAgain = async () => {
    if (counter == 0) {
      var postBody = {
        national_code: location.state.nationalCode,
        time_spend: true,
      };

      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/login/${location.state.nationalCode}/send/again/${location.state.key}`,
        {
          body: JSON.stringify(postBody),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
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
    } else {
      return;
    }
  };

  if (posts.status == "Success") {
    setCookie("Name", posts.data.user.name, { path: "/" });
    setCookie("Family", posts.data.user.family, { path: "/" });
    setCookie("Token", posts.data.token_detail.token, { path: "/" });
    // expires:posts.data.token_detail.expires_in
    // navigate("/dashboard");
  }

  console.log(location.state);
  return (
    <div className={styles["main-container"]}>
      <div className={styles["card-container"]}>
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
