import { Box, Modal } from "@mui/material";
import styles from "./Settings.module.css";
import SettingsForm from "./SettingsForm";
import { useCookies } from "react-cookie";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import React, { useState } from "react";
import ErrorToast from "../../ErrorToast/ErrorToast";
import { Helmet } from "react-helmet";

const CreateSettingsModal = (props) => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [cookies, setCookie] = useCookies(["user"]);
  const [showError, setShowError] = useState(true);
  const onCreateSetting = (formData) => {
    axiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookies.Token),
      method: "post",
      url: "/configs/store",
      requestConfig: formData,
    });
    setShowError(true);
  };
  const cleanError = () => {
    setShowError(false);
  };
  if (posts.status == "Success") {
    window.location.reload();
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>یک تومن |‌ تنظیمات جدید</title>
      </Helmet>
      {error.response?.data.status == "failed" && showError == true ? (
        <ErrorToast error={error} cleanError={cleanError} />
      ) : null}
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll", position: "fixed", top: "50" }}
      >
        <Box className={styles.modal}>
          <SettingsForm onCreateSetting={onCreateSetting} />

          <button className={styles.closeModalBtn} onClick={props.close}>
            بستن
          </button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CreateSettingsModal;
