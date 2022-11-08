import { useState } from "react";
import logo from "../../assets/img/logo_small.png";
import styles from "./Register.module.css";

const Register = () => {
  const [nameInput, setNameInput] = useState({ value: "", isValid: true });
  const [familyInput, setFamilyInput] = useState({ value: "", isValid: true });
  const [nationalCodeInput, setNationalCodeInput] = useState({
    value: "",
    isValid: true,
  });
  const [mobileInput, setmobile] = useState({ value: "", isValid: true });
  const [rules, setRules] = useState({ checked: false, isValid: true });

  const checkIfNumber = (dataInput) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (dataInput !== "" && re.test(dataInput)) {
      return true;
    } else {
      return false;
    }
  };

  const checkIfLetter = (dataInput) => {
    const re = /^(?:[A-Za-z])+$/;

    // if value is not blank, then test the regex

    if (dataInput !== "" && re.test(dataInput)) {
      return true;
    } else {
      return false;
    }
  };

  const nameChange = (event) => {
    if (checkIfLetter(event.target.value)) {
      setNameInput({ value: event.target.value, isValid: true });
    } else {
      setNameInput({ value: event.target.value, isValid: false });
    }
  };
  const familyChange = (event) => {
    if (checkIfLetter(event.target.value)) {
      setFamilyInput({ value: event.target.value, isValid: true });
    } else {
      setFamilyInput({ value: event.target.value, isValid: false });
    }
  };

  const nationalCodeChange = (event) => {
    if (checkIfNumber(event.target.value)) {
      setNationalCodeInput({ value: event.target.value, isValid: true });
    } else {
      setNationalCodeInput({ value: event.target.value, isValid: false });
    }
  };

  const mobileChange = (event) => {
    if (checkIfNumber(event.target.value)) {
      setmobile({ value: event.target.value, isValid: true });
    } else {
      setmobile({ value: event.target.value, isValid: false });
    }
  };

  const onRuleCheck = (event) =>{
    setRules({checked:event.target.checked,isValid:true})
  }
  const onFormSubmit = (event) =>{
    event.preventDefault()
    if(!rules.checked){
      setRules({...rules,isValid:false})
      return
    }
  }

  return (
    <div className={styles["main-container"]}>
      <div className={styles["card-container"]}>
        <div className={styles["logo-container"]}>
          <img src={logo} alt="..." className={styles.logo} />
        </div>
        <hr className="hr-dashed m-0" />
        <div className={styles["form-container"]}>
          <form onSubmit={onFormSubmit} action="" className={styles["login-form"]}>
            <label htmlFor="name">نام</label>
            <br />
            <input
            className={!nameInput.isValid ? styles.inputError : null}
              id="name"
              type="text"
              placeholder="نام خود را وارد کنید"
              onChange={nameChange}
              value={nameInput.value}
            />
            <label htmlFor="family">نام خانوادگی</label>
            <br />
            <input
            className={!familyInput.isValid ? styles.inputError : null}
              id="family"
              type="text"
              placeholder="نام خانوادگی خود را وارد کنید"
              onChange={familyChange}
              value={familyInput.value}
            />
            <label htmlFor="national_code">کدملی</label>
            <br />
            <input
            className={!nationalCodeInput.isValid ? styles.inputError : null}
              type="text"
              id="national_code"
              placeholder="کد ملی خود را وارد کنید"
              onChange={nationalCodeChange}
              value={nationalCodeInput.value}
            />
            <label htmlFor="mobile">شماره همراه</label>
            <br />
            <input
            className={!mobileInput.isValid ? styles.inputError : null}
              type="text"
              id="mobile"
              placeholder=" شماره همراه خود را وارد کنید"
              onChange={mobileChange}
              value={setmobile}
            />

            <label className={rules.isValid == false ? styles["forms-checkbox-label","checkedError"] : styles["forms-checkbox-label"]} htmlFor="rules">
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

    // <div className="bmd-layout-container bmd-drawer-f-l avam-container animated ">
    //     <main className="bmd-layout-content">
    //         <div className="container-fluid">
    //             <div className="main_wrapper">

    //                 <div className="row ">
    //                     <div className="col-md-5 card shade mw-center mh-center">
    //                         <img src={logo} alt="..." className="mw-center " />
    //                         <hr className="hr-dashed m-0"/>
    //                         <form>
    //                             <div className="form-group m-0">
    //                                 <label for="exampleInputName1">نام</label>
    //                                 <input type="text" className="form-control @error('user.name')
    //                                     is-invalid @enderror" id="exampleInputName1"

    //                                        aria-describedby="nameHelp" placeholder="نام"/>
    //                                 <small id="nameHelp" className="form-text text-muted">نام خود را به فارسی وارد کنید</small>
    //                                 <div className="text-danger text-right mt-2">

    //                                 </div>
    //                             </div>
    //                             <div className="form-group m-0">
    //                                 <label for="exampleInputFullName1">نام خانوادگی</label>
    //                                 <input type="text" className="form-control @error('user.family')
    //                                     is-invalid @enderror" id="exampleInputFullName1"

    //                                        aria-describedby="fullnameHelp" placeholder="نام خانوادگی"/>
    //                                 <small id="fullnameHelp" className="form-text text-muted">نام خانوادگی خود را به فارسی وارد کنید</small>
    //                                 <div className="text-danger text-right mt-2">

    //                                 </div>
    //                             </div>
    //                             <div className="form-group m-0">
    //                                 <label for="exampleInputNationalCode1">کدملی</label>
    //                                 <input type="text" className="form-control @error('user.national_code')
    //                                     is-invalid @enderror" id="exampleInputNationalCode1"
    //                                         placeholder="کد ملی خود را وارد کنید"/>
    //                                 <div className="text-danger text-right mt-2">

    //                                 </div>
    //                             </div>
    //                             <div className="form-group m-0">
    //                                 <label for="exampleInputPMobile1">شماره همراه</label>
    //                                 <input type="text" className="form-control @error('user.mobile')
    //                                     is-invalid @enderror" id="exampleInputPMobile1"

    //                                        placeholder="شماره همراه خود را وارد کنید"/>
    //                                 <div className="text-danger text-right mt-2">

    //                                 </div>
    //                             </div>
    //                             <div className="form-check pt-2">
    //                                 <input type="checkbox" className="form-check-input @error('user.rule')
    //                                     is-invalid @enderror" id="exampleCheck1"

    //                                 />

    //                                 <label className="form-check-label" for="exampleCheck1">با قوانین سایت موافق می باشم</label>

    //                             </div>
    //                             <button type="submit" className="btn shade f-primary btn-block text-center">ثبت نام</button>
    //                         </form>
    //                     </div>

    //                 </div>

    //             </div>

    //         </div>
    //     </main>
    // </div>
  );
};

export default Register;
