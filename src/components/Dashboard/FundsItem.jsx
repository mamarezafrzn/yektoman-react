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

const FundItem = (props) => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [deletePosts, deleteError, deleteLoading, deleteAxiosFetch] = useAxiosFunction();
  const [cookie, setCookie] = useCookies(["user"]);

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

  const onDeleteItem = (id) =>{
    deleteAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "delete",
      url: `funds/destroy/${id}`,
    });
  }
console.log(posts.data?.funds)
  return (
    <React.Fragment>
      {posts.data &&
        posts.data.funds.data.map((item) => (
          <div key={item.id} className={styles.cardItemContainer}>
            <div className={styles.cardItemBody}>
              <div className={styles.mainDescription}>
                <div className={styles.mainDescriptionHeading}>
                  <p className={styles.cardHeading}>{item.title}</p>
                  <p className={styles.headingDescription}>سر گروه: شهریار</p>
                </div>
                <div className={styles.cardDetails}>
                  <p>مبلغ کل: {item.price} تومان</p>
                  <p>وام ماهیانه: {item.price_period} تومان</p>
                  <p>تهداد نفرات: {item.num_member} نفر</p>
                  <p>تعداد قرعه کشی انجام شده: {item.num_lottery}</p>
                  <p>تاریخ قرعه کشی: {item.date_lottery}</p>
                  <p>اخرین دریافت کننده وام علی بکماز</p>
                </div>
                <div className={styles.btnContainer}>
                  <button
                    onClick={props.onShowLicstClick}
                    className={styles.membersModalBtn}
                  >
                    لیست اعضا
                  </button>
                  <button className={styles.warningBtn}>
                    <WarningIcon sx={{ color: grey[100] }} />
                  </button>
                  <button className={styles.trashBtn} onClick={()=>onDeleteItem(item.id)}>
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
                <CalendarMonthIcon fontSize="small" /> شروع {item.start_date}
              </p>
              <p>
                <CalendarMonthIcon fontSize="small" /> پایان {item.end_date}
              </p>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};

export default FundItem;
