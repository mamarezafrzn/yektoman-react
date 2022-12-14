import React from "react";
import Card from "../../UI/Card/Card";
import styles from "./UserList.module.css";
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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UserModal from "./UserModal";
import { useEffect } from "react";

const Notifications = () => {
  const [usersPosts, usersError, usersLoading, usersAxiosFetch] =
    useAxiosFunction();
  const [searchInput, setSearchInput] = useState("");
  const [cookie, setCookie] = useCookies(["user"]);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState();
  const [searchBy, setSearchBy] = useState("name");
  const [filterBy, setFilterBy] = useState({});

  useEffect(()=>{
    getUsers()
  },[])

  const openModalHandler = (id) => {
    setUserId(id);
    setOpenModal(!openModal);
  };

  const onSearchBy = (event) => {
    setSearchBy(event.target.value);
    // switch (searchBy) {
    //   case "name":
    //     setFilterBy({
    //       name: searchInput,
    //       family: "",
    //       mobile: "",
    //       national_code: "",
    //     });
    //     break;
    //   case "family":
    //     setFilterBy({
    //       name: "",
    //       family: searchInput,
    //       mobile: "",
    //       national_code: "",
    //     });
    //     break;
    //   case "mobile":
    //     setFilterBy({
    //       name: "",
    //       family: "",
    //       mobile: searchInput,
    //       national_code: "",
    //     });
    //     break;
    //   case "national_code":
    //     setFilterBy({
    //       name: "",
    //       family: "",
    //       mobile: "",
    //       national_code: searchInput,
    //     });
    //     break;
    //   default:
    //     setFilterBy({
    //       name: searchInput,
    //       family: "",
    //       mobile: "",
    //       national_code: "",
    //     });
    // }
  };

  const getUsers = () => {
    usersAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "post",
      url: "/users/gets",
      requestConfig: {
        filters: filterBy,
      },
    });
  };

  


  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
    switch (searchBy) {
      case "name":
        setFilterBy({
          name: event.target.value,
          family: "",
          mobile: "",
          national_code: "",
        });
        break;
      case "family":
        setFilterBy({
          name: "",
          family: event.target.value,
          mobile: "",
          national_code: "",
        });
        break;
      case "mobile":
        setFilterBy({
          name: "",
          family: "",
          mobile: event.target.value,
          national_code: "",
        });
        break;
      case "national_code":
        setFilterBy({
          name: "",
          family: "",
          mobile: "",
          national_code: event.target.value,
        });
        break;
      default:
        setFilterBy({
          name: event.target.value,
          family: "",
          mobile: "",
          national_code: "",
        });
    }
  };
  const searchBtnHandler = () => {
    // if (searchInput.length >= 1) {
    //   setTableRows(rows.filter((item) => item.mobile.includes(searchInput)));
    // }
    getUsers();
  };
  // console.log(usersPosts);

  return (
    <React.Fragment>
      <UserModal
        openModalHandler={openModalHandler}
        openModal={openModal}
        userId={userId}
      />
      <Card heading="لیست کاربران" description="مدیریت کاربران">
        <div className={styles.filterContainer}>
          <label className={styles.searchLabel}>
            <button className={styles.searchBtn} onClick={searchBtnHandler}>
              جست وجو
            </button>
            <input
              autoFocus
              onChange={searchInputHandler}
              value={searchInput}
              type="text"
            />
          </label>
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
                label="Age"
              >
                <MenuItem value="name">نام</MenuItem>
                <MenuItem value="family">نام خانوادگی</MenuItem>
                <MenuItem value="mobile">تلفن</MenuItem>
                <MenuItem value="national_code">کد ملی</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <TableContainer sx={{ padding: "20px" }} component={Paper}>
          <Table
            sx={{ minWidth: 650, direction: "rtl", padding: "10px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right"> </TableCell>
                <TableCell align="right">نام </TableCell>
                <TableCell align="right">نام خانوادگی</TableCell>
                <TableCell align="right">موبایل</TableCell>
                <TableCell align="right">کد ملی</TableCell>

                <TableCell align="right"> ویرایش</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersPosts.data?.users.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right" component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.family}</TableCell>
                  <TableCell align="right">{row.mobile}</TableCell>
                  <TableCell align="right">{row.national_code}</TableCell>

                  <TableCell align="right">
                    <button
                      className={styles.editBtn}
                      onClick={() => openModalHandler(row.id)}
                    >
                      ویرایش
                    </button>
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

export default Notifications;
