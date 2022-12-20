import styles from "./Transactions.module.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";
import { checkIfNumber } from "../../Validation/Validation";
import ErrorToast from "../../ErrorToast/ErrorToast";

const TransactionForm = (props) => {
  const [createPosts, createError, createLoading, createAxiosFetch] =
    useAxiosFunction();
  const [showError, setShowError] = useState(true);
  const [cookie, setCookie] = useCookies(["user"]);
  const [dateValue, setDateValue] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [fund, setFund] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [price, setPrice] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [report_code, setReport_code] = useState({
    value: "",
    validation: { isValid: true },
  });
  const [pay_for_other, setPay_for_other] = useState();

  const onDateChange = (value) => {
    setDateValue({
      value: value.format("YYYY/MM/DD"),
      validation: { isValid: true },
    });
  };
  const onFundSelect = (event) => {
    setFund({ value: event.target.value, validation: { isValid: true } });
  };
  const onPriceChange = (event) => {
    const clean = event.target.value.toString().replace(/,/g, "");
    setPrice({
      value: clean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      validation: { isValid: true },
    });
  };
  //   const monthlyAmountInputChange = (event) => {
  //     const clean = event.target.value.toString().replace(/,/g, '');
  // setMonthlyAmountInput({
  //   value: clean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //   validation: { isValid: true },
  // });
  // };
  const onReportCodeChange = (event) => {
    setReport_code({
      value: event.target.value,
      validation: { isValid: true },
    });
  };
  const onPayForOthersChange = (event) => {
    setPay_for_other(event.target.value);
  };

  const createTransaction = (data) => {
    createAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "post",
      url: "/payments/store",
      requestConfig: data,
    });
  };
  const cleanError = () => {
    setShowError(false);
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    setFund({
      ...fund,
      validation:
        fund.value.length <= 0
          ? { isValid: false, errorMsg: "این فیلد ضروری است!" }
          : { isValid: true },
    });
    setDateValue({
      ...dateValue,
      validation:
        fund.value.length <= 0
          ? { isValid: false, errorMsg: "این فیلد ضروری است!" }
          : { isValid: true },
    });
    setPrice({
      ...price,
      validation: checkIfNumber(price.value),
    });
    setReport_code({
      ...report_code,
      validation: checkIfNumber(report_code.value),
    });

    if (
      fund.validation.isValid &&
      dateValue.validation.isValid &&
      price.validation.isValid &&
      report_code.validation.isValid
    ) {
      createTransaction({
        fund_id: fund.value,
        price: price.value,
        date_pay: dateValue.value,
        report_code: report_code.value,
        pay_for_other,
      });
    } else {
      return;
    }
  };

  if (createPosts.status == "Success") {
    window.location.reload();
  }

  const weekDay = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  return (
    <form className={styles.newForm} onSubmit={onFormSubmit}>
      {createError.response?.data.status == "failed" && showError == true ? (
        <ErrorToast error={createError} cleanError={cleanError} />
      ) : null}
      <label>
        انتخاب صندوق
        <Box
          sx={{
            width: "95%",
            float: "right",
            marginRight: "20px",
            marginTop: "10px",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                backgroundColor: "white",
                maxWidth: "30%",
                textAlign: "center",
                marginTop: "5px",
              }}
            >
              صندوق
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fund.value}
              onChange={onFundSelect}
              label="Age"
            >
              {props.funds.length >= 1 &&
                props.funds?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </label>
      <label className={styles.dateLabel}>
        تاریخ پرداخت
        <DatePicker
          value={dateValue.value}
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
      <label>
        مبلغ
        <input type="text" value={price.value} onChange={onPriceChange} />
      </label>
      <label>
        کد رهگیری
        <input
          type="text"
          value={report_code.value}
          onChange={onReportCodeChange}
        />
      </label>
      <label>
        پرداخت برای دیگران
        <input
          type="text"
          placeholder="کد ملی"
          value={pay_for_other}
          onChange={onPayForOthersChange}
        />
      </label>

      <button type="submit" className={styles.submitBtn}>
        ایجاد
      </button>
    </form>
  );
};

export default TransactionForm;
