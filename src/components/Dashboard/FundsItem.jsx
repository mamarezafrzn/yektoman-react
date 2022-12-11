import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import WarningIcon from "@mui/icons-material/Warning";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import useAxiosFunction from "../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../apis/axiosBaseWithAuth";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Box, Modal, Typography } from "@mui/material";

const FundItem = (props) => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [postInfo, errorInfo, loadingInfo, axiosFetchinfo] = useAxiosFunction();
  const [deletePosts, deleteError, deleteLoading, deleteAxiosFetch] =
    useAxiosFunction();
  const [openModal, setOpenModal] = useState(false);
  const [cookie, setCookie] = useCookies(["user"]);
  const [infoInput,setInfoInput] = useState({value : "" , id : ""});


  const onInfoInputChange = (event) =>{
    setInfoInput({...infoInput,value:event.target.value})
  }

  const onSubmit = (event) =>{
    event.preventDefault()
    postInfoFunc()
  }

  const getFundItems = () => {
    axiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: "/funds/gets",
    });
  };

  useEffect(() => {
    getFundItems();
    // eslint-disable-next-line
  }, []);

  const onDeleteItem = (id) => {
    deleteAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "delete",
      url: `funds/destroy/${id}`,
    });
  };

  const postInfoFunc = () => {
    axiosFetchinfo({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "post",
      url: `funds/alert/${infoInput.id}`,
      requestConfig: {
        text: infoInput.value,
      },
    });
  };

  const openModalHandler = (id) => {
    setOpenModal(!openModal);
     setInfoInput({...infoInput,id})  
  };

  if (deletePosts.status == "Success") {
    window.location.reload();
  }
  if (postInfo.status == "Success" && openModal) {
    setInfoInput({value:"",id:""})
    setOpenModal(false)
    // window.location.reload();
  }

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
            <form className={styles.infoForm} onSubmit={onSubmit}>
              <textarea type="text" value={infoInput.value} onChange={onInfoInputChange}/>
              <button type="submit">ارسال</button>
            </form>
          <button className={styles.closeModalBtn} onClick={openModalHandler}>
            بستن
          </button>
        </Box>
      </Modal>
      {posts?.data &&
        posts.data?.funds.data.map((item) => (
          <div key={item.id} className={styles.cardItemContainer}>
            <div className={styles.cardItemBody}>
              <div className={styles.mainDescription}>
                <div className={styles.mainDescriptionHeading}>
                  <p className={styles.cardHeading}>{item.title}</p>
                  <p className={styles.headingDescription}>سر گروه: شهریار</p>
                </div>
                <div className={styles.cardDetails}>
                  <p>
                    مبلغ کل:{" "}
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    تومان
                  </p>
                  <p>
                    وام ماهیانه:{" "}
                    {item.price_period
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    تومان
                  </p>
                  <p>تهداد نفرات: {item.num_member} نفر</p>
                  <p>تعداد قرعه کشی انجام شده: {item.num_lottery}</p>
                  <p>تاریخ قرعه کشی: {item.date_lottery.slice(0, 10)}</p>
                  <p>اخرین دریافت کننده وام علی بکماز</p>
                </div>
                <div className={styles.btnContainer}>
                  <button
                    onClick={() => props.onShowListClick(item.id)}
                    className={styles.membersModalBtn}
                  >
                    لیست اعضا
                  </button>
                  <button className={styles.warningBtn} onClick={()=>openModalHandler(item.id)}>
                    <WarningIcon sx={{ color: grey[100] }} />
                  </button>
                  <button
                    className={styles.trashBtn}
                    onClick={() => onDeleteItem(item.id)}
                  >
                    <DeleteIcon sx={{ color: grey[100] }} />
                  </button>
                </div>
              </div>
              <div className={styles.editBtnContainer}>
                <Link
                  className={styles.editBtn}
                  to="/dashboard/create-coffer"
                  state={{ isEdit: "edit", id: item.id }}
                >
                  <EditIcon sx={{ color: grey[100] }} />
                </Link>
              </div>
            </div>
            <div className={styles.cardItemFooter}>
              <p>
                <CalendarMonthIcon fontSize="small" /> شروع{" "}
                {item.start_date.slice(0, 10)}
              </p>
              <p>
                <CalendarMonthIcon fontSize="small" /> پایان{" "}
                {item.end_date.slice(0, 10)}
              </p>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};

export default FundItem;
