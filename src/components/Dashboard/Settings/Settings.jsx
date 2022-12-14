import React, { useEffect } from "react";
import Card from "../../UI/Card/Card";
import styles from "./Settings.module.css"
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


function createData(settingsVariable, settingsValue) {
    return { settingsVariable, settingsValue};
  }
  const rows = [
    createData("هرچی",'هرچی'),
    createData('هرچی','هرچی'),
  ];


const Settings = () => {
    const [searchInput,setSearchInput] = useState("");
    const [tableRows,setTableRows] = useState(rows)
    const [cookie, setCookie] = useCookies(["user"]);
    const [configsPosts, configsError, configsLoading, configsAxiosFetch] =
    useAxiosFunction();


    useEffect(()=>{
      getConfigs()
    },[])

    console.log(configsPosts)

    const getConfigs = () => {
      configsAxiosFetch({
        axiosInstance: baseUrlWithAuthFunc(cookie.Token),
        method: "get",
        url: "configs/gets",
      });
    };

    const searchInputHandler = (event) =>{
        setSearchInput(event.target.value)
    }
    const searchBtnHandler =()=>{
        if(searchInput.length >= 1){
            setTableRows(
                rows.filter((item)=>item.settingsVariable.includes(searchInput))
            )
        }
    }
  return (
    <React.Fragment>
      <Card
        heading="لیست تنظیمات"
        description="لیست تمامی تنظیمات مربوط به سایت"
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
            <TableCell align="right">متغیر </TableCell>
            <TableCell align="right">مقدار</TableCell>

            
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
              <TableCell align="right">{row.settingsVariable}</TableCell>
              <TableCell align="right">{row.settingsValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>
    </React.Fragment>
  );
};

export default Settings;
