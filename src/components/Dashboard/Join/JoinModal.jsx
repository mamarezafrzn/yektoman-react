import styles from "./Join.module.css";
import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";

const JoinModal = (props) => {
  const [conventPosts, conventError, conventLoading, conventAxiosFetch] =
    useAxiosFunction();
  const [requestPosts, requestError, requestLoading, requestAxiosFetch] =
    useAxiosFunction();

  const [cookie, setCookie] = useCookies(["user"]);

  useEffect(() => {
    console.log("get");
    getConvent();
  }, [props.fundId]);

  const getConvent = () => {
    conventAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: `/funds/covenant/${props.fundId}`,
    });
  };

  const sendFundRequest = () => {
    requestAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "post",
      url: `/funds/request/${props.fundId}`,
    });
  };

  // if(props.openModal && requestPosts.status == "Success"){
  // }

  return (
    <Modal
      open={props.openModal}
      onClose={props.openModalHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: "scroll", position: "fixed", top: "50" }}
    >
      <Box className={styles.modal}>
        {requestPosts.status == "Success" ? (
          <div className={styles.modalSuccess}><p>درخواست با موفقیت ارسال شد</p></div>
        ) : (
          <div>
            <div
              className={styles.modalContent}
              dangerouslySetInnerHTML={{
                __html: conventPosts && conventPosts.data?.convent,
              }}
            ></div>
            <button className={styles.btnJoin} onClick={sendFundRequest}>
              عضو شدن
            </button>
          </div>
        )}
        <button
          className={styles.closeModalBtn}
          onClick={props.openModalHandler}
        >
          بستن
        </button>
      </Box>
    </Modal>
  );
};

export default JoinModal;
