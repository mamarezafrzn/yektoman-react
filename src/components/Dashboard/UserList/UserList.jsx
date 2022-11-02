import React from "react";

import Card from "../../UI/Card/Card";

import styles from "./UserList.module.css"


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from "react";


function createData(name, mobile,nationalCode, picture,role,edit) {
    return { name, mobile, nationalCode, picture,role,edit };
  }
  const rows = [
    createData('علی بکماز', "11111111", "2222222", 'mamad.png',"admin","ویرایش"),
    createData('علی بکماز', "11111111", "2222222", 'mamad.png',"admin","ویرایش"),
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
                rows.filter((item)=>item.mobile.includes(searchInput))
            )
        }
    }
  return (
    <React.Fragment>
      <Card
        heading="لیست کاربران"
        description="مدیریت کاربران"
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
            <TableCell align="right">نام و نام خانوادگی</TableCell>
            <TableCell align="right">موبایل</TableCell>
            <TableCell align="right">کد ملی</TableCell>
            <TableCell align="right">عکس</TableCell>
            <TableCell align="right"> سمت</TableCell>
            <TableCell align="right"> ویرایش</TableCell>
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
              <TableCell align="right">{row.mobile}</TableCell>
              <TableCell align="right">{row.nationalCode}</TableCell>
              <TableCell align="right">{row.picture}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.edit}</TableCell>
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
