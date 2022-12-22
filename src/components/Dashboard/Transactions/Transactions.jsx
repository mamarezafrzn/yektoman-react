import React from "react";
import { useState, useEffect } from "react";
import Card from "../../UI/Card/Card";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";
import styles from "./Transactions.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Modal, Typography } from "@mui/material";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TransactionForm from "./TransactionForm";
import { Helmet } from "react-helmet";

const Transactions = () => {
  const [
    transactionsPosts,
    transactionsError,
    transactionsLoading,
    transactionsAxiosFetch,
  ] = useAxiosFunction();
  const [fundsPosts, fundsError, fundsLoading, fundsAxiosFetch] =
    useAxiosFunction();
  const [statusPosts, statusError, statusLoading, statusAxiosFetch] =
    useAxiosFunction();
  const [cookie, setCookie] = useCookies(["user"]);
  const [searchInput, setSearchInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [filterBy, setFilterBy] = useState({});
  const [dateValue, setDateValue] = useState();

  const onDateChange = (value) => {
    if (value[0] && value[1]) {
      setDateValue(value);
    }
  };

  useEffect(() => {
    getTransactions();
    getFunds();
  }, [statusPosts]);

  const getFunds = () => {
    fundsAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: "/funds/gets/select",
      requestConfig: {
        search: "",
      },
    });
  };
  const statusChange = (data, id) => {
    statusAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "post",
      url: `/payments/change/status/${id}`,
      requestConfig: {
        status: data,
      },
    });
  };

  const onstatusChangeClick = (data, id) => {
    statusChange(data, id);
  };

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
    switch (searchBy) {
      case "fund_id":
        setFilterBy({
          fund_id: event.target.value,
          price: "",
          start_date_pay: "",
          end_date_pay: "",
          report_code: "",
        });
        break;
      case "price":
        setFilterBy({
          fund_id: "",
          price: event.target.value,
          start_date_pay: "",
          end_date_pay: "",
          report_code: "",
        });
        break;
        setFilterBy({
          fund_id: "",
          price: "",
          date: event.target.value,
          report_code: "",
        });
        break;
      case "report_code":
        setFilterBy({
          fund_id: "",
          price: "",
          start_date_pay: "",
          end_date_pay: "",
          report_code: event.target.value,
        });
        break;
      default:
        setFilterBy({
          fund_id: "",
          price: "",
          start_date_pay: "",
          end_date_pay: "",
          report_code: "",
        });
    }
  };
  const searchBtnHandler = () => {
    // if (searchInput.length >= 1) {
    //   setTableRows(rows.filter((item) => item.sendTo.includes(searchInput)));
    // }
    getTransactions();
  };

  const modalClickHandler = () => {
    setOpenModal(!openModal);
  };

  const getTransactions = () => {
    transactionsAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "post",
      url: "/payments/gets",
      requestConfig: {
        filters:
          searchBy == "date"
            ? {
                fund_id: "",
                price: "",
                start_date_pay: dateValue[0]?.format(),
                end_date_pay: dateValue[1]?.format(),
                report_code: "",
              }
            : filterBy,
      },
    });
  };
  const onSearchBy = (event) => {
    setSearchBy(event.target.value);
  };
  const weekDay = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  return (
    <React.Fragment>
      <Helmet>
        <title>یک تومن |‌ تراکنش ها</title>
      </Helmet>
      <Modal
        open={openModal}
        onClose={modalClickHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <Typography
            className="text-right"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            پرداخت جدید
          </Typography>
          {fundsPosts && <TransactionForm funds={fundsPosts.data?.funds} />}
          <button className={styles.closeModalBtn} onClick={modalClickHandler}>
            بستن
          </button>
        </Box>
      </Modal>

      <Card
        heading="لیست تراکنش ها"
        description="لیست تمامی تراکنش های مربوط به شما"
        showBtn="true"
        btnText="ثبت پرداخت جدید"
        modalClickHandler={modalClickHandler}
      >
        {/* <label className={styles.searchLabel}>
          <button className={styles.searchBtn} onClick={searchBtnHandler}>
            جست وجو
          </button>
          <input onChange={searchInputHandler} type="text" />
        </label> */}
        <div className={styles.filterContainer}>
          <label className={styles.searchLabel}>
            <button className={styles.searchBtn} onClick={searchBtnHandler}>
              جست وجو
            </button>
            {searchBy == "date" ? (
              <label className={styles.dateLabel}>
                <DatePicker
                  fixMainPosition
                  range
                  rangeHover
                  value={dateValue}
                  onChange={onDateChange}
                  calendar={persian}
                  className="rmdp-prime"
                  locale={persian_fa}
                  weekDays={weekDay}
                  hideOnScroll
                  placeholder="برای مثال ۱/۱/۱۴۰۲ - ۲/۲/۱۴۰۲"
                  style={{
                    border: "1px solid grey !important",
                    height: "30px",
                    textAlign: "center",
                  }}
                ></DatePicker>
              </label>
            ) : (
              <input
                autoFocus
                onChange={searchInputHandler}
                value={searchInput}
                type="text"
              />
            )}
          </label>
          <Box
            sx={{
              width: "25%",
              float: "right",
              marginRight: "20px",
              direction: "rtl",
              textAlign: "right",
            }}
          >
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  backgroundColor: "white",
                  minWidth: "60px",
                  textAlign: "center",
                }}
              >
                بر اساس
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchBy}
                onChange={onSearchBy}
                label="Age"
              >
                <MenuItem value="fund_id">صندوق</MenuItem>
                <MenuItem value="price">مبلغ</MenuItem>
                <MenuItem value="report_code">کد رهگیری</MenuItem>
                <MenuItem value="date">تاریخ پرداخت</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <TableContainer sx={{ padding: "20px" }} component={Paper}>
          <Table
            sx={{ minWidth: 650, direction: "rtl", padding: "10px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right"> </TableCell>
                <TableCell align="right">نام صندوق</TableCell>
                <TableCell align="right"> پرداخت کننده</TableCell>
                <TableCell align="right">پرداخت برای</TableCell>
                <TableCell align="right"> مبلغ</TableCell>
                <TableCell align="right"> تاریخ پرداخت</TableCell>
                <TableCell align="right">کد رهگیری</TableCell>
                <TableCell align="right">وضعیت </TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionsPosts.data?.payments?.data.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right" component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">{row.fund.title}</TableCell>
                  <TableCell align="right">{row.pay_by.family}</TableCell>
                  <TableCell align="right">
                    {row.pay_for ? row.pay_for : "-"}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    {row.pay_by.created_at.slice(0, 10)}
                  </TableCell>
                  <TableCell align="right">{row.report_code}</TableCell>
                  <TableCell align="right">
                    {row.status == "1" && "تایید شده"}
                    {row.status == "0" && "در انتظار تایید "}
                    {row.status == "-1" && "رد شده"}
                  </TableCell>
                  {row.status == "0" && (
                    <TableCell align="right" className={styles.btnContainer}>
                      <button
                        className={styles.confirmBtn}
                        onClick={() => onstatusChangeClick("1", row.id)}
                      >
                        تایید
                      </button>
                      <button
                        className={styles.denyBtn}
                        onClick={() => onstatusChangeClick("-1", row.id)}
                      >
                        رد
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </React.Fragment>
  );
};

export default Transactions;
