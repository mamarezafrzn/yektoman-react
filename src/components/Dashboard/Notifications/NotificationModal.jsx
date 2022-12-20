import styles from "./Notifications.module.css";
import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";
import { style } from "@mui/system";

const NotificationModal = (props) => {
  const [cookie, setCookie] = useCookies(["user"]);
  const [
    notificationPosts,
    notificationError,
    notificationLoading,
    notificationAxiosFetch,
  ] = useAxiosFunction();
  const [
    operationPosts,
    operationError,
    operationLoading,
    operationAxiosFetch,
  ] = useAxiosFunction();

  useEffect(() => {
    getNotification();
  }, [props.fundId]);

  const getNotification = () => {
    notificationAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: `/notifications/get/${props.fundId}`,
    });
  };
  const notificationOperation = (data) => {
    operationAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "post",
      url: `/notifications/change/${props.id}`,
      requestConfig: {
        status: data,
      },
    });
  };


  return (
    <Modal
      open={props.openModal}
      onClose={props.modalClickHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {notificationPosts.data?.notification.type == "info" && (
        <React.Fragment>
          {" "}
          <Typography
            className="text-right"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            پیام
          </Typography>
          <div className={styles.notifMessage}>
            <h6>متن پیام</h6>
            <p>{notificationPosts.data?.notification.message} </p>
          </div>
        </React.Fragment>
      )}
      {notificationPosts.data?.notification.type == "join" &&
      operationPosts.status == "Success" ? (
        <div className={styles.modalSuccess}>
          <p>{operationPosts.meta?.message}</p>
        </div>
      ) : (
        <Box className={styles.modal}>
          <Typography
            className="text-right"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            پیام
          </Typography>
          <div className={styles.notifMessage}>
            <h6>متن پیام</h6>
            <p>{notificationPosts.data?.notification.message} </p>
            {notificationPosts.data?.notification.type == "join" &&
              notificationPosts.data?.notification.status == "0" && (
                <div className={styles.modalBtnContainer}>
                  <button
                    className={style.confirmBtn}
                    onClick={() => notificationOperation("1")}
                  >
                    تایید
                  </button>
                  <button
                    className={style.denyBtn}
                    onClick={() => notificationOperation("-1")}
                  >
                    رد
                  </button>
                </div>
              )}
            {notificationPosts.data?.notification.type == "join" &&
              notificationPosts.data?.notification.status == "1" && (
                <div className={styles.modalBtnContainer}>
                  <p>تایید شده</p>
                </div>
              )}
            {notificationPosts.data?.notification.type == "join" &&
              notificationPosts.data?.notification.status == "-1" && (
                <div className={styles.modalBtnContainer}>
                  <p>رد شده</p>
                </div>
              )}
          </div>
          <button
            className={styles.closeModalBtn}
            onClick={props.modalClickHandler}
          >
            بستن
          </button>
        </Box>
      )}
    </Modal>
  );
};

export default NotificationModal;
