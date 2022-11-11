import React, { useState } from "react";
import DesktopMenu from "../Menu/desktopMenu/DesktopMenu";
import Navbar from "../Menu/navbar";
import Card from "../UI/Card/Card";
import styles from "./Dashboard.module.css";

import WarningIcon from "@mui/icons-material/Warning";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { grey } from "@mui/material/colors";
import { Box, Button, Modal, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";



function createData(name, score,moavaghe, payed) {
  return { name, score, moavaghe, payed };
}
const rows = [
  createData('علی بکماز', 3, "-", 0),
  createData('جواد ذرینچه', 2, "-", 1),
];

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(!openModal);
  };

  return (
    <React.Fragment>

      <Modal
        open={openModal}
        onClose={openModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <Typography className="text-right" id="modal-modal-title" variant="h6" component="h2">
            لیست افراد
          </Typography>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,direction:"rtl",padding:"10px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">شماره</TableCell>
            <TableCell align="right">نام و نام خانوادگی</TableCell>
            <TableCell align="right">امتیاز</TableCell>
            <TableCell align="right">معوقه</TableCell>
            <TableCell align="right">پرداخت شده</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
              <TableCell align="right">{row.moavaghe}</TableCell>
              <TableCell align="right">{row.payed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            <button className={styles.closeModalBtn} onClick={openModalHandler}>بستن</button>
        </Box>
        
      </Modal>
      <Card heading="داشبورد" description="لیست صندوق های شما">
        <div className={styles.cardItemContainer}>
          <div className={styles.cardItemBody}>
            <div className={styles.mainDescription}>
              <div className={styles.mainDescriptionHeading}>
                <p className={styles.cardHeading}>تست</p>
                <p className={styles.headingDescription}>سر گروه: شهریار</p>
              </div>
              <div className={styles.cardDetails}>
                <p>مبلغ کل: ۱۰۰,۰۰۰,۰۰۰ تومان</p>
                <p>وام ماهیانه: ۱۰,۰۰۰,۰۰۰ تومان</p>
                <p>تهداد نفرات: ۱۰ نفر</p>
                <p>تعداد قرعه کشی انجام شده: ۰</p>
                <p>تاریخ قرعه کشی: تست</p>
                <p>اخرین دریافت کننده وام علی بکماز</p>
              </div>
              <div className={styles.btnContainer}>
                <button onClick={openModalHandler} className={styles.membersModalBtn}>لیست اعضا</button>
                <button className={styles.warningBtn}>
                  <WarningIcon sx={{ color: grey[100] }} />
                </button>
                <button className={styles.trashBtn}>
                  <DeleteIcon sx={{ color: grey[100] }} />
                </button>
              </div>
            </div>
            <div className={styles.editBtnContainer}>
              <Link className={styles.editBtn} to="/dashboard/create-coffer" state="edit">
                <EditIcon sx={{ color: grey[100] }} />
              </Link>
            </div>
          </div>
          <div className={styles.cardItemFooter}>
            <p>
              <CalendarMonthIcon fontSize="small" /> شروع ۱۱/۱۱/۱۱
            </p>
            <p>
              <CalendarMonthIcon fontSize="small" /> پایان ۱۲/۲۱/۱۲
            </p>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Dashboard;
