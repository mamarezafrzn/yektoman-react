import { useState } from "react";
import logo from "../../assets/img/logo_small.png";
import styles from "./Register.module.css";
import { checkIfLetter, checkIfNumber } from "../Validation/Validation";
import useAxiosFunction from "../../axiosFetch/useAxiosFunction";
// import axios from "../../apis/axiosBase";
import axios from "../../apis/axiosBase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [posts, error, loading, axiosFetch] = useAxiosFunction();

  const [nameInput, setNameInput] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [familyInput, setFamilyInput] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [nationalCodeInput, setNationalCodeInput] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [mobileInput, setmobile] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [rules, setRules] = useState({ checked: false, validation: true });

  const nameChange = (event) => {
    setNameInput({ value: event.target.value, validation: { isValid: true } });
  };

  const familyChange = (event) => {
    setFamilyInput({
      value: event.target.value,
      validation: { isValid: true },
    });
  };

  const nationalCodeChange = (event) => {
    setNationalCodeInput({
      value: event.target.value,
      validation: { isValid: true },
    });
  };

  const mobileChange = (event) => {
    setmobile({ value: event.target.value, validation: { isValid: true } });
  };

  const onRuleCheck = (event) => {
    setRules({ checked: event.target.checked, validation: true });
  };

  const postData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: "/register",
      requestConfig: {
        name: nameInput.value,
        family: familyInput.value,
        mobile: mobileInput.value,
        national_code: nationalCodeInput.value,
        rule: rules.checked,
      },
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    setNameInput({ ...nameInput, validation: checkIfLetter(nameInput.value) });
    setFamilyInput({
      ...familyInput,
      validation: checkIfLetter(familyInput.value),
    });
    setmobile({ ...mobileInput, validation: checkIfNumber(mobileInput.value) });
    setNationalCodeInput({
      ...nationalCodeInput,
      validation: checkIfNumber(nationalCodeInput.value),
    });

    if (!rules.checked) {
      setRules({ ...rules, validation: false });
      return;
    }
    if (
      nameInput.validation.isValid &&
      familyInput.validation.isValid &&
      mobileInput.validation.isValid &&
      nationalCodeInput.validation.isValid
    ) {
      postData();
    } else {
      return;
    }
  };

  if (posts.status == "Success") {
    navigate("/register/verification", {
      state: {
        key: posts.data.key,
        mobile: posts.data.mobile,
        nationalCode: nationalCodeInput.value,
      },
    });
  }

  return (
    <div className={styles["main-container"]}>
      <div className={styles["card-container"]}>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
        <hr className="hr-dashed m-0" />
        <div className={styles["form-container"]}>
          <form
            onSubmit={onFormSubmit}
            action=""
            className={styles["login-form"]}
          >
            <label htmlFor="name">نام</label>
            <br />
            <input
              className={
                !nameInput.validation.isValid ? styles.inputError : null
              }
              id="name"
              type="text"
              placeholder="نام خود را وارد کنید"
              onChange={nameChange}
              value={nameInput.value}
            />
            {!nameInput.validation.isValid && (
              <p
                className={styles.errorLine}
              >{`نام ${nameInput.validation.errorMsg}`}</p>
            )}
            <label htmlFor="family">نام خانوادگی</label>
            <br />
            <input
              className={
                !familyInput.validation.isValid ? styles.inputError : null
              }
              id="family"
              type="text"
              placeholder="نام خانوادگی خود را وارد کنید"
              onChange={familyChange}
              value={familyInput.value}
            />
            {!familyInput.validation.isValid && (
              <p
                className={styles.errorLine}
              >{`نام خانوادگی ${familyInput.validation.errorMsg}`}</p>
            )}
            <label htmlFor="national_code">کدملی</label>
            <br />
            <input
              className={
                !nationalCodeInput.validation.isValid ? styles.inputError : null
              }
              type="text"
              id="national_code"
              placeholder="کد ملی خود را وارد کنید"
              onChange={nationalCodeChange}
              value={nationalCodeInput.value}
            />
            {!nationalCodeInput.validation.isValid && (
              <p
                className={styles.errorLine}
              >{`کد ملی ${nationalCodeInput.validation.errorMsg}`}</p>
            )}
            <label htmlFor="mobile">شماره همراه</label>
            <br />
            <input
              className={
                !mobileInput.validation.isValid ? styles.inputError : null
              }
              type="text"
              id="mobile"
              placeholder=" شماره همراه خود را وارد کنید"
              onChange={mobileChange}
              value={mobileInput.value}
            />
            {!mobileInput.validation.isValid && (
              <p
                className={styles.errorLine}
              >{`شماره همراه ${mobileInput.validation.errorMsg}`}</p>
            )}

            <label
              className={
                rules.validation == false
                  ? styles[("forms-checkbox-label", "checkedError")]
                  : styles["forms-checkbox-label"]
              }
              htmlFor="rules"
            >
              با قوانین سایت موافق می باشم
              <input
                onChange={onRuleCheck}
                checked={rules.checked}
                className={styles["forms-checkbox"]}
                type="checkbox"
                name="rules"
                id="rules"
              />
            </label>
            <button type="submit" className={styles["login-btn"]}>
              ثبت نام
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
