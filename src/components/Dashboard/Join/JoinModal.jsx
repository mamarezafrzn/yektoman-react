import styles from "../Dashboard.module.css"
import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";


const JoinModal = (props) => {
    const [requestPosts, requestError, requestLoading, requestAxiosFetch] = useAxiosFunction();
    const [cookie, setCookie] = useCookies(["user"]);


    const postRequest = () => {
        requestAxiosFetch({
          axiosInstance: baseUrlWithAuthFunc(cookie.Token),
          method: "post",
          url: `/funds/covenant/${props.fundId}`,
        });
      };


    return(
        <Modal
        open={props.openModal}
        onClose={props.openModalHandler}
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

            <p>متن</p>
            <p>متن</p>
            <p>متن</p>
            <p>متن</p>
            <button className={styles.btnJoin} onClick={postRequest}>عضو شدن</button>
          <button className={styles.closeModalBtn} onClick={props.openModalHandler}>
            بستن
          </button>
        </Box>
      </Modal>
    )
}


export default JoinModal;