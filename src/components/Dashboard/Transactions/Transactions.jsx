import React from "react";
import { useState } from "react";

import Card from "../../UI/Card/Card";
import DesktopMenu from "../../Menu/desktopMenu/DesktopMenu";
import Navbar from "../../Menu/navbar";

import styles from "./Transactions.module.css"


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { grey } from "@mui/material/colors";
import { Box, Button, Modal, Typography } from "@mui/material";



function createData(name, sendTo,sendFor, sendBy,price,date,code,status) {
    return { name, sendTo, sendFor, sendBy,price,date,code,status };
  }
  const rows = [
    createData("صندوق شماره ۱",'علی بکماز', "هومن خلعتبری","اقای یک","12000", "1/1/1",123123, 'خوانده شده'),
    createData("صندوق شماره ۱",'جواد ذرینچه', "حسن چشم قشنگ","اقای دو","12000", "1/1/1",123123,  'خوانده شده'),
  ];


const Transactions = () => {
    const [searchInput,setSearchInput] = useState("");
    const [tableRows,setTableRows] = useState(rows)
    const [openModal, setOpenModal] = useState(false);

    const searchInputHandler = (event) =>{
        setSearchInput(event.target.value)
    }
    const searchBtnHandler =()=>{
        if(searchInput.length >= 1){
            setTableRows(
                rows.filter((item)=>item.sendTo.includes(searchInput))
            )
        }
    }

    const modalClickHandler =()=>{
        setOpenModal(!openModal)
    }

  return (
    <React.Fragment>
              <Modal
        open={openModal}
        onClose={modalClickHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <Typography className="text-right" id="modal-modal-title" variant="h6" component="h2">
            پرداخت جدید
          </Typography>
          <form className={styles.newForm}>
          <label>
            نام صندوق
            <input type="text"/>
          </label>
          <label>
           تاریخ پرداخت
            <input type="text"/>
          </label>
          <label>
           مبلغ ماهیانه
            <input type="text"/>
          </label>
          <label>
            کد رهگیری
            <input type="text"/>
          </label>
          <label>
            دوره
            <input type="text"/>
          </label>
          <div className={styles.radioContainer}>
            <label style={{display:"flex"}} >
             پرداخت برای من
              <input name="payFor" type="radio"/>
            </label>
            <label style={{display:"flex"}}>
              پرداخت برای دیگران
              <input name="payFor" type="radio"/>
            </label>
          </div>
          <button type="submit" className={styles.submitBtn}>
            ایجاد
          </button>
        </form>
            <button className={styles.closeModalBtn} onClick={modalClickHandler}>بستن</button>
        </Box>
        
      </Modal>
      <Navbar />
      <DesktopMenu />

      <Card
        heading="لیست اعلانات"
        description="لیست تمامی اعلانات مربوط به شما"
        showBtn="true"
        modalClickHandler={modalClickHandler}
      >
        <label className={styles.searchLabel}>
            <button className={styles.searchBtn} onClick={searchBtnHandler}>جست وجو</button>
            <input onChange={searchInputHandler} type="text"/>
        </label>
          <TableContainer sx={{padding:"20px"}} component={Paper}>
      <Table sx={{ minWidth: 650,direction:"rtl",padding:"10px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="right"> </TableCell>
            <TableCell align="right">نام صندوق</TableCell>
            <TableCell align="right">پرداخت به</TableCell>
            <TableCell align="right">پرداخت برای</TableCell>
            <TableCell align="right"> توسط</TableCell>
            <TableCell align="right"> مبلغ</TableCell>
            <TableCell align="right"> تاریخ پرداخت</TableCell>
            <TableCell align="right">کد رهگیری</TableCell>
            <TableCell align="right">وضعیت </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.sendTo}</TableCell>
              <TableCell align="right">{row.sendFor}</TableCell>
              <TableCell align="right">{row.sendBy}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.code}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
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
