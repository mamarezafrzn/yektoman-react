import { useCookies } from "react-cookie";
import React, { useState } from "react";
import styles from "./Profile.module.css";
import { checkIfLetter, checkIfNumber } from "../../Validation/Validation";
import ErrorToast from "../../ErrorToast/ErrorToast";


const ProfileForm = (props) => {
  const { formData } = props;
  const [response,setResponse] = useState()
  const profileFileInput = React.useRef(null);
  const [profilePic, setProfilePic] = useState(null);
  const idCardFileInput = React.useRef(null);
  const [idCardPic, setIdCardPic] = useState(null);
  const certificateFileInput = React.useRef(null);
  const [certificatePic, setCertificatePic] = useState(null);
  const [name, setName] = useState({
    value: formData?.name,
    validation: { isValid: true },
  });
  const [family, setFamily] = useState({
    value: formData?.family,
    validation: { isValid: true },
  });
  const [email, setEmail] = useState({
    value: formData?.email ? formData?.email : "",
    validation: { isValid: true },
  });
  const [mobile, setMobile] = useState({
    value: formData?.mobile,
    validation: { isValid: true },
  });
  const [nationalCode, setNationalCode] = useState({
    value: formData?.national_code,
    validation: { isValid: true },
  });
  const [cardNumber, setCardNumber] = useState({
    value: formData?.profile ? formData?.profile?.number_card : "",
    validation: { isValid: true },
  });
  const [accountNumber, setAccountNumber] = useState({
    value: formData?.profile ? formData?.profile?.account_bank : "",
    validation: { isValid: true },
  });
  const [IBN, setIBN] = useState({
    value: formData?.profile ? formData?.profile?.IBN : "",
    validation: { isValid: true },
  });
  const [cookie, setCookie] = useCookies(["user"]);
  const [showError, setShowError] = useState(true);



  const onNameChange = (event) => {
    setName({ value: event.target.value, validation: { isValid: true } });
  };
  const onFamilyChange = (event) => {
    setFamily({ value: event.target.value, validation: { isValid: true } });
  };
  const onEmailChange = (event) => {
    setEmail({ value: event.target.value, validation: { isValid: true } });
  };
  const onMobileChange = (event) => {
    setMobile({ value: event.target.value, validation: { isValid: true } });
  };
  const onNationalCodeChange = (event) => {
    setNationalCode({
      value: event.target.value,
      validation: { isValid: true },
    });
  };
  const onCardNumberChange = (event) => {
    setCardNumber({ value: event.target.value, validation: { isValid: true } });
  };
  const onAccountNumberChange = (event) => {
    setAccountNumber({
      value: event.target.value,
      validation: { isValid: true },
    });
  };
  const onIBNChange = (event) => {
    setIBN({ value: event.target.value, validation: { isValid: true } });
  };
  const onProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
  };
  const onIdCardPicChange = (event) => {
    setIdCardPic(event.target.files[0]);
  };
  const onCertificatePicChange = (event) => {
    setCertificatePic(event.target.files[0]);
  };

  const onProfileFileInputClick = (event) => {
    event.preventDefault();
    profileFileInput.current.click();
  };
  const onIdCardFileInputClick = (event) => {
    event.preventDefault();
    idCardFileInput.current.click();
  };
  const onCertificateFileInputClick = (event) => {
    event.preventDefault();
    certificateFileInput.current.click();
  };
  const blob = new Blob([null], {
    
});


  const postData =  async() => {
    const newFormData = new FormData();
    const data = {
      name: name.value,
      family: family.value,
      mobile: mobile.value,
      national_code: nationalCode.value,
      IBN: IBN.value,
      number_card: cardNumber.value,
      account_bank: accountNumber.value,
      image_national_code: idCardPic ? idCardPic : blob,
      avatar: profilePic ? certificatePic : blob,
      image_certificate: certificatePic ? certificatePic : blob ,
    };
    Object.keys(data).map((key) => {
      newFormData.append(key, data[key]);
    });
 
      const response = await fetch("https://ws.yektoman.ir/api/v1/profile", {
        body: newFormData,
        method: "POST",
        headers: {

          Authorization: "Bearer " + cookie.Token,
        },
      });

      setResponse( await response.json())
      
      setShowError(true);
    };


  const onFormSubmit = (event) => {
    event.preventDefault();
    setName({ ...name, validation: checkIfLetter(name.value) });
    setFamily({ ...family, validation: checkIfLetter(family.value) });
    setMobile({ ...mobile, validation: checkIfNumber(mobile.value) });
    setNationalCode({
      ...nationalCode,
      validation: checkIfNumber(nationalCode.value),
    });
    setCardNumber({
      ...cardNumber,
      validation: checkIfNumber(cardNumber.value),
    });
    setAccountNumber({
      ...accountNumber,
      validation: checkIfNumber(accountNumber.value),
    });
    setIBN({
      ...IBN,
      validation:
        IBN.value.lenght >= 1
          ? { isValid: true }
          : { isValid: false, errorMsg: "این فیلد ضروری می باشد!" },
    });

    if (
      name.validation.isValid &&
      family.validation.isValid &&
      mobile.validation.isValid &&
      nationalCode.validation.isValid &&
      cardNumber.validation.isValid &&
      accountNumber.validation.isValid &&
      IBN.validation.isValid
    ) {
      postData();
    }
  };

  const cleanError = () => {
    setShowError(false);
  };

  if(response?.status == "Success"){
    window.location.reload()
  }


  return (
    <form className={styles.newForm} onSubmit={onFormSubmit}>
      {response?.status == "failed" && showError == true ? (
        <ErrorToast error={response} cleanError={cleanError} typeResponse={true}/>
      ) : null}
      <div className={styles.formHorizontal}>
        <label>
          نام
          <input
            type="text"
            value={name.value}
            onChange={onNameChange}
            className={!name.validation.isValid ? styles.inputError : null}
          />
          {!name.validation.isValid &&
             (
              
              <p className={styles.errorLine}>{name.validation?.errorMsg}</p>
            )}
        </label>
        <label>
          نام خانوادگی
          <input
            type="text"
            value={family.value}
            onChange={onFamilyChange}
            className={!family.validation.isValid ? styles.inputError : null}
          />
          {!family.validation.isValid &&
            (
              <p className={styles.errorLine}>{family.validation?.errorMsg}</p>
            )}
        </label>
        <label>
          پست الکترونیک
          <input
            type="email"
            value={email.value}
            onChange={onEmailChange}
            className={!email.validation.isValid ? styles.inputError : null}
          />
          {/* {!email.validation.isValid ||
            (
              <p className={styles.errorLine}>{email.validation?.errorMsg}</p>
            )} */}
        </label>
        <label>
          موبایل
          <input
            type="text"
            value={mobile.value}
            onChange={onMobileChange}
            className={!mobile.validation.isValid ? styles.inputError : null}
          />
          {!mobile.validation.isValid &&
            (
              <p className={styles.errorLine}>{mobile.validation?.errorMsg}</p>
            )}
        </label>
      </div>
      <div className={styles.formVertical}>
        <label>
          کد ملی
          <input
            type="text"
            value={nationalCode.value}
            onChange={onNationalCodeChange}
            className={
              !nationalCode.validation.isValid ? styles.inputError : null
            }
          />
          {!nationalCode.validation.isValid &&
            (
              <p className={styles.errorLine}>
                {nationalCode.validation?.errorMsg}
              </p>
            )}
        </label>
        <label>
          شماره کارت بانکی
          <input
            type="text"
            value={cardNumber.value}
            onChange={onCardNumberChange}
            className={
              !cardNumber.validation.isValid ? styles.inputError : null
            }
          />
          {!cardNumber.validation.isValid &&
            (
              <p className={styles.errorLine}>
                {cardNumber.validation?.errorMsg}
              </p>
            )}
        </label>
        <label>
          شماره حساب بانکی
          <input
            type="text"
            value={accountNumber.value}
            onChange={onAccountNumberChange}
            className={
              !accountNumber.validation.isValid ? styles.inputError : null
            }
          />
          {!accountNumber.validation.isValid &&
            (
              <p className={styles.errorLine}>
                {accountNumber.validation?.errorMsg}
              </p>
            )}
        </label>
        <label>
          شماره شبا بانکی
          <input
            type="text"
            value={IBN.value}
            onChange={onIBNChange}
          />
          {!IBN.validation.isValid ||
            (
              <p className={styles.errorLine}>{IBN.validation?.errorMsg}</p>
            )}
        </label>
        <label>
          <button
            className={styles.fileBtn}
            onClick={onProfileFileInputClick}
            disabled={formData?.avtar ? true : false}
          >
            عکس پروفایل
          </button>
          <input
            ref={profileFileInput}
            type="file"
            onChange={onProfilePicChange}
            hidden
          />
        </label>
        <label>
          <button className={styles.fileBtn} onClick={onIdCardFileInputClick}>
            {" "}
            عکس کارت ملی
          </button>
          <input
            type="file"
            ref={idCardFileInput}
            onChange={onIdCardPicChange}
            hidden
          />
        </label>
        <label>
          <button
            className={styles.fileBtn}
            onClick={onCertificateFileInputClick}
          >
            عکس شناسنامه
          </button>
          <input
            ref={certificateFileInput}
            type="file"
            onChange={onCertificatePicChange}
            hidden
          />
        </label>
        <button type="submit" className={styles.submitBtn}>
          به روز رسانی
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
