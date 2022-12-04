import React, { useEffect, useState } from "react";
import styles from "../NewCoffer.module.css";
import AdapterJalali from "@date-io/date-fns-jalali";
import format from "date-fns-jalali/format";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { checkIfLetter, checkIfNumber } from "../../../Validation/Validation";

const CofferForm = (props) => {
  const [nameInput, setNameInput] = useState({
    value: props.isEdit ? props.fundData.title : "",
    validation: { isValid: true },
    isFocus: false,
  });

  const [monthlyAmountInput, setMonthlyAmountInput] = useState({
    value: props.isEdit ? props.fundData.price_period : "",
    validation: { isValid: true },
    isFocus: false,
  });
  const [numberOfMembersInput, setNumberOfMembersInput] = useState({
    value: props.isEdit ? props.fundData.num_member : "",
    validation: { isValid: true },
    isFocus: false,
  });

  const [daysToDrawInput, setDaysToDrawInput] = useState({
    value: props.isEdit ? props.fundData.every_few_day_lottery : "",
    validation: { isValid: true },
    isFocus: false,
  });
  const [value, setValue] = useState(new Date(2022, 3, 7));
  const [cofferWithScore, setCofferWithScore] = useState(null);
  const [firstPersonLeader, setFirstPersonLeader] = useState(null);


    //-------------------------------------------------------- <IsEdit> --------------------------------------------------------------

    useEffect(()=>{
      if(props.isEdit){
        //fill inputs with get data
      }
    },[])

    //---------------------------------------------------------<Is Edit/>-------------------------------------------------------------
    
  const nameChange = (event) => {
    setNameInput({
      value: event.target.value,
      validation: { isValid: true },
      isFocus: true,
    });
  };
  const monthlyAmountInputChange = (event) => {
    setMonthlyAmountInput({
      value: event.target.value,
      validation: { isValid: true },
      isFocus: true,
    });
  };
  const numberOfMembersInputChange = (event) => {
    setNumberOfMembersInput({
      value: event.target.value,
      validation: { isValid: true },
      isFocus: true,
    });
  };
  const daysToDrawInputChange = (event) => {
    setDaysToDrawInput({
      value: event.target.value,
      validation: { isValid: true },
      isFocus: true,
    });
  };

  const cofferWithScoreChange = (event) => {
    setCofferWithScore(event.target.checked);
  };

  const firstPersonLeaderChange = (event) => {
    setFirstPersonLeader(event.target.checked);
  };

  // console.log(format(value, 'yyyy-MM-dd'))

  const onFormSubmit = (event) => {
    event.preventDefault();

    setNameInput({ ...nameInput, validation: checkIfLetter(nameInput.value) });
    setMonthlyAmountInput({
      ...monthlyAmountInput,
      validation: checkIfNumber(monthlyAmountInput.value),
    });
    setNumberOfMembersInput({
      ...numberOfMembersInput,
      validation: checkIfNumber(numberOfMembersInput.value),
    });
    setDaysToDrawInput({
      ...daysToDrawInput,
      validation: checkIfNumber(daysToDrawInput.value),
    });

    if (
      nameInput.validation.isValid &&
      monthlyAmountInput.validation.isValid &&
      numberOfMembersInput.validation.isValid &&
      daysToDrawInput.validation.isValid
    ) {
      props.postData({
        title: nameInput.value,
        num_member: numberOfMembersInput.value,
        price: monthlyAmountInput.value,
        every_few_day_lottery: daysToDrawInput.value,
        start_date: format(value, "yyyy/MM/dd"),
      });
      // console.log(format(value, "yyyy/MM/dd"))
    } else {
      return;
    }
  };



  

  return (
    <form className={styles.newForm} onSubmit={onFormSubmit}> 
      <label>
        نام صندوق
        {nameInput.isFocus ? (
          <input
            autoFocus
            className={!nameInput.validation.isValid ? styles.inputError : null}
            type="text"
            onChange={nameChange}
            value={nameInput.value}
            onBlur={() => setNameInput({ ...nameInput, isFocus: false })}
          />
        ) : (
          <input
            className={!nameInput.validation.isValid ? styles.inputError : null}
            type="text"
            onChange={nameChange}
            value={nameInput.value}
          />
        )}
        {!nameInput.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`نام ${nameInput.validation.errorMsg}`}</p>
        )}
      </label>

      <label>
        مبلغ ماهیانه اقساط
        {monthlyAmountInput.isFocus ? (
          <input
            autoFocus
            className={
              !monthlyAmountInput.validation.isValid ? styles.inputError : null
            }
            type="text"
            onChange={monthlyAmountInputChange}
            value={monthlyAmountInput.value}
            onBlur={() =>
              setMonthlyAmountInput({
                ...monthlyAmountInput,
                isFocus: false,
              })
            }
          />
        ) : (
          <input
            className={
              !monthlyAmountInput.validation.isValid ? styles.inputError : null
            }
            type="text"
            onChange={monthlyAmountInputChange}
            value={monthlyAmountInput.value}
          />
        )}
        {!monthlyAmountInput.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`مبلغ ماهیانه ${monthlyAmountInput.validation.errorMsg}`}</p>
        )}
      </label>
      <label>
        تعداد اعضا
        {numberOfMembersInput.isFocus ? (
          <input
            autoFocus
            className={
              !numberOfMembersInput.validation.isValid
                ? styles.inputError
                : null
            }
            type="text"
            onChange={numberOfMembersInputChange}
            value={numberOfMembersInput.value}
            onBlur={() =>
              setNumberOfMembersInput({
                ...numberOfMembersInput,
                isFocus: false,
              })
            }
          />
        ) : (
          <input
            className={
              !numberOfMembersInput.validation.isValid
                ? styles.inputError
                : null
            }
            type="text"
            onChange={numberOfMembersInputChange}
            value={numberOfMembersInput.value}
          />
        )}
        {!numberOfMembersInput.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`تعداد اعضا ${numberOfMembersInput.validation.errorMsg}`}</p>
        )}
      </label>
      <label>
        قرعه کشی هر چند روز
        {daysToDrawInput.isFocus ? (
          <input
            autoFocus
            className={
              !daysToDrawInput.validation.isValid ? styles.inputError : null
            }
            type="text"
            onChange={daysToDrawInputChange}
            value={daysToDrawInput.value}
            onBlur={() =>
              setDaysToDrawInput({ ...daysToDrawInput, isFocus: false })
            }
          />
        ) : (
          <input
            className={
              !daysToDrawInput.validation.isValid ? styles.inputError : null
            }
            type="text"
            onChange={daysToDrawInputChange}
            value={daysToDrawInput.value}
          />
        )}
        {!daysToDrawInput.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`تعداد روز ${daysToDrawInput.validation.errorMsg}`}</p>
        )}
      </label>
      <label className={styles.dateLabel}>
        تاریخ شروع
        <LocalizationProvider dateAdapter={AdapterJalali}>
          <DatePicker
            mask="____/__/__"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            components={{
              LeftArrowIcon: ArrowForward,
              RightArrowIcon: ArrowBack,
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ direction: "rtl" }} />
            )}
          />
        </LocalizationProvider>
      </label>

      <div className={styles.chackboxContainer}>
        <label style={{ display: "flex" }}>
          صندوق با امتیاز
          <input
            style={{ margin: "0px" }}
            type="checkbox"
            checked={cofferWithScore}
            onChange={cofferWithScoreChange}
          />
        </label>
        <label style={{ display: "flex" }}>
          نفر اول سرگروه
          <input
            style={{ margin: "0px" }}
            type="checkbox"
            checked={firstPersonLeader}
            onChange={firstPersonLeaderChange}
          />
        </label>
      </div>
      <button type="submit" className={styles.submitBtn}>
        {props.isEdit ? "ویرایش " : "ایجاد"}
      </button>
    </form>
  );
};

export default CofferForm;
