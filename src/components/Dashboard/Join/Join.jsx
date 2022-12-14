import React from "react";
import Card from "../../UI/Card/Card";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./Join.module.css";
import { useState } from "react";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";
import JoinModal from "./JoinModal";


const Join = () => {
  const [searchInput, setSearchInput] = useState("");
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [cookie, setCookie] = useCookies(["user"]);
  const [openModal, setOpenModal] = useState(false);
  const [fundId,setFundId] = useState()


  const openModalHandler = (id) => {
    setFundId(id)  
    setOpenModal(!openModal);
  };


  const onSearchInputChange = (event) => {
    setSearchInput({ value: event.target.value});
  };


  const getFund = () => {
    axiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "post",
      url: "/funds/search",
      requestConfig: {
        search: searchInput,
      },
    });
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    getFund();
  };
console.log(posts)
  return (
    <React.Fragment>
      <JoinModal openModalHandler={openModalHandler} openModal={openModal} fundId={fundId}/>
      <Card
        heading="پیوستن به طرح"
        description="پس از جست و جو به طرح خود بپیوندید"
      >
        <form className={styles.searchForm} onSubmit={onSearchHandler}>
          <label>
            جست و جوی طرح

            <input
                autoFocus
                type="text"
                value={searchInput.value}
                onChange={onSearchInputChange}
              />
          </label>
          <button className={styles.searchBtn} type="submit">
            جست و جو
          </button>
        </form>
        <div className={styles.tableContainer}>
          <Typography
            className="text-right"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            لیست صندوق ها
          </Typography>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, direction: "rtl", padding: "10px" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right">شماره</TableCell>
                  <TableCell align="right">نام صندوق</TableCell>
                  <TableCell align="right">ایجاد کننده</TableCell>
                  <TableCell align="right">مبلغ کل</TableCell>
                  <TableCell align="right">مبلغ ماهیانه</TableCell>
                  <TableCell align="right">تاریخ شروع</TableCell>
                  <TableCell align="right">تاریخ پایان</TableCell>
                  <TableCell align="right">وضعیت</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.data?.fund.map((row, index) => (                 
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right" component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.user_by?.family}</TableCell>
                    <TableCell align="right">
                      {row.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      تومان
                    </TableCell>
                    <TableCell align="right">
                      {row.price_period
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      تومان
                    </TableCell>
                    <TableCell align="right">{row.start_date}</TableCell>
                    <TableCell align="right">{row.end_date}</TableCell>
                    <TableCell align="right">{row.status?.title}</TableCell>
                    <TableCell align="right">
                      <button className={styles.tableBtn} onClick={()=>openModalHandler(row.id)}>عضو شدن</button>
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

export default Join;
