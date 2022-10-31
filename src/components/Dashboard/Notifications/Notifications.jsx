import React from "react";

import Card from "../../UI/Card/Card";
import DesktopMenu from "../../Menu/desktopMenu/DesktopMenu";
import Navbar from "../../Menu/navbar";

import styles from "./Notifications.module.css"


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from "react";


function createData(name, sender,message, date,status) {
    return { name, sender, message, date,status };
  }
  const rows = [
    createData("صندوق شماره ۱",'علی بکماز', "بپر بالا", "1/1/1", 'خوانده شده'),
    createData("صندوق شماره ۱",'جواد ذرینچه', "بپر بالا", "1/1/1",  'خوانده شده'),
  ];


const Notifications = () => {
    const [searchInput,setSearchInput] = useState("");
    const [tableRows,setTableRows] = useState(rows)

    const searchInputHandler = (event) =>{
        setSearchInput(event.target.value)
    }
    const searchBtnHandler =()=>{
        if(searchInput.length >= 1){
            setTableRows(
                rows.filter((item)=>item.sender.includes(searchInput))
            )
        }
    }
  return (
    <React.Fragment>
      <Navbar />
      <DesktopMenu />
      <Card
        heading="لیست اعلانات"
        description="لیست تمامی اعلانات مربوط به شما"
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
            <TableCell align="right">فرستنده</TableCell>
            <TableCell align="right">پیام</TableCell>
            <TableCell align="right">زمان ارسال</TableCell>
            <TableCell align="right"> وضعیت</TableCell>
            
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
              <TableCell align="right">{row.sender}</TableCell>
              <TableCell align="right">{row.message}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
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

export default Notifications;
