import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DesktopMenu from "../../Menu/desktopMenu/DesktopMenu";
import Navbar from "../../Menu/navbar";
import Card from "../../UI/Card/Card";
import { checkIfLetter, checkIfNumber } from "../../Validation/Validation";
import styles from "./NewCoffer.module.css";
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from '@mui/material/TextField';
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Newcoffer = (props) => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(location.state == "edit" ? true : false);
  const [nameInput, setNameInput] = useState({ value: "", isValid: true });
  const [monthlyAmountInput, setMonthlyAmountInput] = useState({
    value: "",
    isValid: true,
  });
  const [numberOfMembersInput, setNumberOfMembersInput] = useState({
    value: "",
    isValid: true,
  });
  const [startDateInput, setStartDateInput] = useState({
    value: "",
    isValid: true,
  });
  const [daysToDrawInput, setDaysToDrawInput] = useState({
    value: "",
    isValid: true,
  });
  const [value, setValue] = React.useState(new Date(2022, 3, 7));

  return (
    <React.Fragment>
      <Card
        heading={isEdit ? "ویرایش صندوق" : "ایجاد صندوق جدید"}
        description={
          isEdit ? "ویرایش صندوق قرض الحسنه" : "افتتاح صندوق قرض الحسنه"
        }
      >
        <form className={styles.newForm}>
          <label>
            نام صندوق
            <input type="text" />
          </label>
          <label>
            مبلغ ماهیانه اقساط
            <input type="text" />
          </label>
          <label>
            تعداد اعضا
            <input type="text" />
          </label>
          <label>
            قرعه کشی هر چند روز
            <input type="text" />
          </label>
          <label className={styles.dateLabel}>
            تاریخ شروع
            <LocalizationProvider dateAdapter={AdapterJalali} >
              <DatePicker 
              
                mask="____/__/__"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                components={{
                  LeftArrowIcon: ArrowForward,
                  RightArrowIcon: ArrowBack,
                }}
                renderInput={(params) => <TextField {...params} sx={{direction:"rtl"}}/>}
              />
            </LocalizationProvider>
          </label>

          <div className={styles.chackboxContainer}>
            <label style={{ display: "flex" }}>
              صندوق با امتیاز
              <input style={{ margin: "0px" }} type="checkbox" />
            </label>
            <label style={{ display: "flex" }}>
              نفر اول سرگروه
              <input style={{ margin: "0px" }} type="checkbox" />
            </label>
          </div>
          <button type="submit" className={styles.submitBtn}>
            {isEdit ? "ویرایش " : "ایجاد"}
          </button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Newcoffer;
