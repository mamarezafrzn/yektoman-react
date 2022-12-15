import React, { useEffect } from "react";
import Card from "../../UI/Card/Card";
import styles from "./Settings.module.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";
import CreateSettingsModal from "./CreateSettingsModal";
import EditModal from "./EditModal";



const Settings = () => {
  const [searchInput, setSearchInput] = useState("");
  const [cookie, setCookie] = useCookies(["user"]);
  const [configsPosts, configsError, configsLoading, configsAxiosFetch] =
    useAxiosFunction();
    const [deletePosts, deleteError, deleteLoading, deleteAxiosFetch] =
    useAxiosFunction();
  const [newSettingsModal,setNewSettingsModal] = useState(false);
  const [editSettingsModal,setEditSettingsModal] = useState(false);
  const [settingsId,setSettingsId] = useState();

  useEffect(() => {
    getConfigs();
  }, []);



  const getConfigs = () => {
    configsAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: "configs/gets",
    });
  };
  const deleteConfigs = (id) => {
    deleteAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "delete",
      url: `/configs/destroy/${id}`,
    });
  };

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
  };
  const searchBtnHandler = () => {

  };
  const onNewSettingsClick = () =>{
    setNewSettingsModal(!newSettingsModal)
  }
  const onEditSettingsClick = (id) =>{
    setSettingsId(id)
    setEditSettingsModal(!editSettingsModal)
  }
  
  const onDeleteSettings = (id,variable)=>{
    console.log(variable)
    deleteConfigs(id)
  }
  if(deletePosts.status=="Success"){
    window.location.reload()
  }

  return (
    <React.Fragment>
      {newSettingsModal && <CreateSettingsModal open={newSettingsModal} close={onNewSettingsClick}/>}
      {editSettingsModal && settingsId && <EditModal open={editSettingsModal} close={onEditSettingsClick} settingsId={settingsId}/>}
      <Card
        heading="لیست تنظیمات"
        description="لیست تمامی تنظیمات مربوط به سایت"
        showBtn="true"
        btnText="تنظیمات جدید"
        modalClickHandler={onNewSettingsClick}
      >
        <label className={styles.searchLabel}>
          <button className={styles.searchBtn} onClick={searchBtnHandler}>
            جست وجو
          </button>
          <input onChange={searchInputHandler} type="text" />
        </label>
        <TableContainer sx={{ padding: "20px" }} component={Paper}>
          <Table
            sx={{ minWidth: 650, direction: "rtl", padding: "10px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right"> </TableCell>
                <TableCell align="right">متغیر </TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {configsPosts &&
                configsPosts.data?.configs?.data.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right" component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell align="right">{row.variable}</TableCell>
                    <TableCell align="right">
                      <button className={styles.editBtn} onClick={()=>{onEditSettingsClick(row.id)}}>ویرایش</button>
                    </TableCell>
                    <TableCell align="right">
                      <button className={styles.deleteBtn} onClick={()=>{onDeleteSettings(row.id,row.variable)}}>حذف</button>
                    </TableCell>
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
