import styles from "../Login.module.css";
import withCodeStyle from "./WithCode.module.css";
import logo from "../../../assets/img/logo_small.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkIfNumber } from "../../Validation/Validation";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import axios from "../../../apis/axiosBase";
import { useCookies } from "react-cookie";

const WithCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [counter, setCounter] = useState(150);
  const [codeInput, setCodeInput] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
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
  const onSubmit = (event) => {
    event.preventDefault();
    setCodeInput({
      ...codeInput,
      validation: checkIfNumber(codeInput.value),
    });

    if (codeInput.validation.isValid) {
      loginPost();
    } else {
      return;
    }
  };

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
