import React, { useState } from "react";
import Card from "../UI/Card/Card";
import styles from "./Dashboard.module.css";

import { Box, Modal, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FundItem from "./FundsItem";
import useAxiosFunction from "../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Dashboard = () => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [openModal, setOpenModal] = useState(false);
  const [cookie, setCookie] = useCookies(["user"]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (openModal && posts.status == "Success") {
      setRows(posts.data?.funds);
    }
  }, [posts]);

  // function createData(name, moavaghe, payed) {
  //   return { name, moavaghe, payed };
  // }


  const getFundMember = (id) => {
    axiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: `/funds/members/${id}`,
    });
  };

  const openModalHandler = () => {
    setOpenModal(!openModal);
  };
  const showId = (id) => {
    openModalHandler();
    getFundMember(id);
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
          <Typography
            className="text-right"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            لیست افراد
          </Typography>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, direction: "rtl", padding: "10px" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right">شماره</TableCell>
                  <TableCell align="right">نام و نام خانوادگی</TableCell>

                  <TableCell align="right">معوقه</TableCell>
                  <TableCell align="right">پرداخت شده</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right" component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell align="right">{row.full_name}</TableCell>

                      <TableCell align="right">{row.delayed}</TableCell>
                      <TableCell align="right">{row.Paid}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <button className={styles.closeModalBtn} onClick={openModalHandler}>
            بستن
          </button>
        </Box>
      </Modal>
      <Card heading="داشبورد" description="لیست صندوق های شما">
        <FundItem onShowListClick={showId} />
      </Card>
    </React.Fragment>
  );
};

export default Dashboard;
