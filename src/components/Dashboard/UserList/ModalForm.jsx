import { useEffect, useState } from "react";
import { checkIfLetter, checkIfNumber } from "../../Validation/Validation";
import styles from "./UserList.module.css";

const ModalForm = (props) => {
  useEffect(() => {
    if (props.userData?.id == props.userId) {
      setName({ ...name, value: props.userData?.name });
      setFamily({ ...family, value: props.userData?.family });
      setMobile({ ...mobile, value: props.userData?.mobile });
      setNationalCode({
        ...nationalCode,
        value: props.userData?.national_code,
      });
    }
  }, [props.userData]);
  const [name, setName] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [family, setFamily] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [mobile, setMobile] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [nationalCode, setNationalCode] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [role, setRole] = useState("accountants");

  const onNameChange = (event) => {
    setName({ value: event.target.value, validation: { isValid: true } });
  };
  const onFamilyChange = (event) => {
    setFamily({ value: event.target.value, validation: { isValid: true } });
  };

  const onMobileChange = (event) => {
    setMobile({ value: event.target.value, validation: { isValid: true } });
  };

  const onNationalChange = (event) => {
    setNationalCode({
      value: event.target.value,
      validation: { isValid: true },
    });
  };
  const onRoleChange = (event) => {
    setRole(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    setName({ ...name, validation: checkIfLetter(name.value) });
    setFamily({ ...family, validation: checkIfLetter(name.value) });
    setNationalCode({
      ...nationalCode,
      validation: checkIfNumber(nationalCode.value),
    });
    setMobile({ ...mobile, validation: checkIfNumber(mobile.value) });

    if (
      name.validation.isValid &&
      family.validation.isValid &&
      nationalCode.validation.isValid &&
      mobile.validation.isValid
    ) {
      props.editUser({
        name: name.value,
        family: family.value,
        national_code: nationalCode.value,
        mobile: mobile.value,
        role,
      });
    } else {
      return;
    }
  };

  return (
    <form className={styles.modalForm} onSubmit={onFormSubmit}>
      <label>
        نام:
        <input type="text" value={name.value} onChange={onNameChange} />
      </label>
      {!name.validation.isValid && (
        <p className={styles.errorLine}>{`نام ${name.validation.errorMsg}`}</p>
      )}
      <label>
        نام خانوادگی:
        <input type="text" value={family.value} onChange={onFamilyChange} />
        {!family.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`نام خانوادگی ${family.validation.errorMsg}`}</p>
        )}
      </label>
      <label>
        کد ملی:
        <input
          type="text"
          value={nationalCode.value}
          onChange={onNationalChange}
        />
        {!nationalCode.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`کد ملی ${nationalCode.validation.errorMsg}`}</p>
        )}
      </label>
      <label>
        شماره تلفن:
        <input type="text" value={mobile.value} onChange={onMobileChange} />
        {!mobile.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`شماره تلفن ${mobile.validation.errorMsg}`}</p>
        )}
      </label>
      <label style={{ marginBottom: "20px" }}>
        انتخاب نقش:
        <select name="role" id="role" value={role} onChange={onRoleChange}>
          <option value="accountants">کاربر</option>
          <option value="admin">ادمین</option>
        </select>
      </label>
      <button type="submit" className={styles.submitBtn}>
        ثبت تغییرات
      </button>
    </form>
  );
};

export default ModalForm;
