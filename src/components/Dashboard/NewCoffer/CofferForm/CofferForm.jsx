import React, { useEffect, useState } from "react";
import styles from "../NewCoffer.module.css";
import AdapterJalali from "@date-io/date-fns-jalali";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import TextField from "@mui/material/TextField";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
import format from "date-fns-jalali/format";
import { checkIfLetter, checkIfNumber } from "../../../Validation/Validation";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const CofferForm = (props) => {
  const priceRegex = /^[0-9]*\.?[0-9]*$/;
  
  const [nameInput, setNameInput] = useState({
    value: props.isEdit ? props.fundData.title : "",
    validation: { isValid: true },
  });

  const [monthlyAmountInput, setMonthlyAmountInput] = useState({
    value: props.isEdit ? props.fundData.price_period : "",
    validation: { isValid: true },
  });

  const [numberOfMembersInput, setNumberOfMembersInput] = useState({
    value: props.isEdit ? props.fundData.num_member : "",
    validation: { isValid: true },
  });

  const [daysToDrawInput, setDaysToDrawInput] = useState({
    value: props.isEdit ? props.fundData.every_few_day_lottery : "",
    validation: { isValid: true },
  });
  // const [value, setValue] = useState(
  //   props.isEdit ? props.fundData.date : new Date().toJSON().slice(0, 10)
  // );
  const [cofferWithScore, setCofferWithScore] = useState(null);
  const [firstPersonLeader, setFirstPersonLeader] = useState(null);
// console.log(props.fundData?.start_date)
  //-------------------------------------------------------- <date> --------------------------------------------------------------
  // const [dateValue, setDateValue] = useState(
  //   props.isEdit
  //     ? new DateObject({
  //         date: props.fundData.start_date,
  //         format: "YYYY MM DD",
  //       })
  //     : null
  // );
  const [dateValue, setDateValue] = useState(
    props.isEdit
      ? props.fundData.start_date
      : null
  );
  // console.log(props.isEdit && props.fundData.start_date)
  // console.log(props.isEdit ? dateValue.format("YYYY/MM/DD") : dateValue)
  const onDateChange = (value) => {
    setDateValue(value.format("YYYY/MM/DD"));
    // console.log(value.format("YYYY/MM/DD hh:mm:ss.SSS a"))
    // console.log(dateValue);
  };
  //---------------------------------------------------------<date/>-------------------------------------------------------------

  const nameChange = (event) => {
    setNameInput({
      value: event.target.value,
      validation: { isValid: true },
    });
  };
  const monthlyAmountInputChange = (event) => {
        const clean = event.target.value.toString().replace(/,/g, '');
    setMonthlyAmountInput({
      value: clean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      validation: { isValid: true },
    });
  };
  const numberOfMembersInputChange = (event) => {
    setNumberOfMembersInput({
      value: event.target.value,
      validation: { isValid: true },
    });
  };
  const daysToDrawInputChange = (event) => {
    setDaysToDrawInput({
      value: event.target.value,
      validation: { isValid: true },
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
      validation: checkIfNumber(monthlyAmountInput.value.toString().replace(/,/g, '')),
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
        price: monthlyAmountInput.value.toString().replace(/,/g, ''),
        every_few_day_lottery: daysToDrawInput.value,
        start_date: dateValue,
      });
      // console.log(format(value, "yyyy/MM/dd"))
    } else {
      return;
    }
  };

  const weekDay = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  return (
    <form className={styles.newForm} onSubmit={onFormSubmit}>
      <label>
        نام صندوق
        <input
            autoFocus
            className={!nameInput.validation.isValid ? styles.inputError : null}
            type="text"
            onChange={nameChange}
            value={nameInput.value}
          />
        {!nameInput.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`نام ${nameInput.validation.errorMsg}`}</p>
        )}
      </label>

      <label>
        مبلغ صندوق
        <div style={{position:"relative"}}>
          <input
            autoFocus
            className={
              !monthlyAmountInput.validation.isValid ? styles.inputError : null
            }
            type="text"
            onChange={monthlyAmountInputChange}
            value={monthlyAmountInput.value}
          />
          <span className={styles.inputCurrency}>تومان</span>
          </div>       
        {!monthlyAmountInput.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`مبلغ ماهیانه ${monthlyAmountInput.validation.errorMsg}`}</p>
        )}
      </label>
      <label>
        تعداد اعضا
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
          />
        {!numberOfMembersInput.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`تعداد اعضا ${numberOfMembersInput.validation.errorMsg}`}</p>
        )}
      </label>
      <label>
        قرعه کشی هر چند روز
        <input
            autoFocus
            className={
              !daysToDrawInput.validation.isValid ? styles.inputError : null
            }
            type="text"
            onChange={daysToDrawInputChange}
            value={daysToDrawInput.value}
          />
        {!daysToDrawInput.validation.isValid && (
          <p
            className={styles.errorLine}
          >{`تعداد روز ${daysToDrawInput.validation.errorMsg}`}</p>
        )}
      </label>
      <label className={styles.dateLabel}>
        تاریخ شروع
        {/* <LocalizationProvider dateAdapter={AdapterJalali}>
          <DatePicker
          views={['year', 'month','day']}
        
          
          orientation="landscape"
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
        </LocalizationProvider> */}
        <DatePicker
          value={dateValue}
          onChange={onDateChange}
          calendar={persian}
          className="rmdp-prime"
          showOtherDays
          locale={persian_fa}
          weekDays={weekDay}
          hideOnScroll
          placeholder="برای مثال ۱/۱/۱۴۰۲"
          style={{
            border: "1px solid grey !important",
            height: "30px",
            textAlign: "center",
          }}
        />
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
