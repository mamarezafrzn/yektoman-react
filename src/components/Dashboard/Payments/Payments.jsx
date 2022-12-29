import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Card from "../../UI/Card/Card";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "./Payments.module.css";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

const Payments = (props) => {
  const [
    getPaymentsPosts,
    getPaymentsError,
    getPaymentsLoading,
    getPaymentsAxiosFetch,
  ] = useAxiosFunction();
  const [cookie, setCookie] = useCookies(["user"]);
  const itemId = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [fundsData, setFundsData] = useState();
  const [tableData, setTableData] = useState([]);
  const [searchBy, setSearchBy] = useState();
  useEffect(() => {
    getPayments();
    if (getPaymentsPosts) {
      setTableData(getPaymentsPosts?.data?.payments);
    }
  }, [getPaymentsPosts.status == "Success"]);

  const getPayments = () => {
    getPaymentsAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: `/payments/fund/${itemId.state.itemId}`,
    });
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  //   const modalClickHandler = () =>{
  //     setOpenModal(false)
  //   }
  const onOpenModal = (data) => {
    setFundsData(data);
    setOpenModal(true);
  };

  const onSearchBy = (event) => {
    event.preventDefault();
    setSearchBy(event.target.value);
  };
  const searchBtnHandler = () => {
    if (searchBy == "all") {
      setTableData(getPaymentsPosts?.data?.payments);
    }
    if (searchBy == "toPay") {
      setTableData(tableData.filter((item) => item?.status_pay == 2));
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>پرداخت ها |‌ عضویت</title>
      </Helmet>
      <Modal
        open={openModal}
        onClose={onCloseModal}
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
          {openModal && getPaymentsPosts && (
            <PaymentModal
              funds={fundsData}
              title={getPaymentsPosts?.data.fund}
            />
          )}
          <button className={styles.closeModalBtn} onClick={onCloseModal}>
            بستن
          </button>
        </Box>
      </Modal>
      <Card heading="لیست پرداخت" description="">
        <div className={styles.filterContainer}>
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
                label="Search"
              >
                <MenuItem value="all">همه</MenuItem>
                <MenuItem value="toPay">پرداخت نشده</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <label className={styles.searchLabel}>
            <button className={styles.searchBtn} onClick={searchBtnHandler}>
              جست وجو
            </button>
          </label>
        </div>
        <div className={styles.tableContainer}>
          <Typography
            className="text-right"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            لیست پرداخت ها
          </Typography>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, direction: "rtl", padding: "10px" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right">شماره</TableCell>
                  <TableCell align="right">وضعیت</TableCell>
                  <TableCell align="right">مبلغ پرداختی </TableCell>
                  <TableCell align="right">مبلغ </TableCell>
                  <TableCell align="right">تاریخ </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData &&
                  tableData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right" component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">
                        {row.price_pay
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        تومان
                      </TableCell>
                      <TableCell align="right">
                        {row.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        تومان
                      </TableCell>
                      <TableCell align="right">{row.date_pay}</TableCell>
                      <TableCell align="right">
                        {row.status_pay == 2 && (
                          <button
                            className={styles.tableBtn}
                            onClick={() => onOpenModal(row)}
                          >
                            پرداخت
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Payments;
