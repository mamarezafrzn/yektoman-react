import styles from "./Login.module.css";
import logo from "../../assets/img/logo_small.png";
import { checkIfLetter, checkIfNumber } from "../Validation/Validation";
import useAxiosFunction from "../../axiosFetch/useAxiosFunction";
import axios from "../../apis/axiosBase";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from 'react-cookie';

const RegisterVerification = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const location = useLocation();
  const navigate = useNavigate()
  const [posts, error, loading, axiosFetch] = useAxiosFunction();

  const [codeInput, setCodeInput] = useState({
    value: "",
    validation: { isValid: true },
  });


  const codeInputChange = (event) => {
    setCodeInput({ value: event.target.value, validation: { isValid: true } });
  };

  const postCode = () => {
    axiosFetch({
        axiosInstance: axios,
        method: "post",
        url: `register/verification/${location.state.mobile}/${location.state.key}`,
        requestConfig: {
            code:codeInput.value
        },
      });
  };

  const onFormSubmit = (event) => {
    event.preventDefault()
    setCodeInput({ ...codeInput, validation: checkIfNumber(codeInput.value) });
    if(codeInput.validation.isValid){
        postCode()
       
    }else{
        return
    }
  };


  if (posts.status == "Success") {
    setCookie('Name', posts.data.user.name , { path: '/' });
    setCookie('Family', posts.data.user.family, { path: '/' });
    setCookie('Token', posts.data.token_detail.token, { path: '/' ,});
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
            {!codeInput.validation.isValid && <p className={styles.errorLine}>کد وارد شده صحیح نمی باشد</p>}
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
