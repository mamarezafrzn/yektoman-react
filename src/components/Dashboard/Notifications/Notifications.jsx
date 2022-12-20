import React from "react";
import Card from "../../UI/Card/Card";
import styles from "./Notifications.module.css"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from "react";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";
import { useEffect } from "react";


function createData(name, sender,message, date,status) {
    return { name, sender, message, date,status };
  }
  const rows = [
    createData("صندوق شماره ۱",'علی بکماز', "بپر بالا", "1/1/1", 'خوانده شده'),
    createData("صندوق شماره ۱",'جواد ذرینچه', "بپر بالا", "1/1/1",  'خوانده شده'),
  ];


const Notifications = () => {
    const [searchInput,setSearchInput] = useState("");
    const [tableRows,setTableRows] = useState(rows);
    const [cookie, setCookie] = useCookies(["user"]);
    const [
      notificationsPosts,
      notificationsError,
      notificationsLoading,
      notificationsAxiosFetch,
    ] = useAxiosFunction();

    useEffect(()=>{
      getNotifications()
    },[notificationsPosts])

    const getNotifications = () => {
      notificationsAxiosFetch({
        axiosInstance: baseUrlWithAuthFunc(cookie.Token),
        method: "get",
        url: "/notifications/gets",
      });
    };
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
            
          </TableRow>
        </TableHead>
        <TableBody>
          {notificationsPosts.data?.notifications.data.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="right">{row.fund?.title}</TableCell>
              <TableCell align="right">{row.from?.family}</TableCell>
              <TableCell align="right">{row.message}</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>

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
