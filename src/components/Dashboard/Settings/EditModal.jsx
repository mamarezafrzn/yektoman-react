import React, { useEffect } from "react";
import { Box, Modal } from "@mui/material";
import styles from "./Settings.module.css";
import SettingsForm from "./SettingsForm";
import { useCookies } from "react-cookie";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import ErrorToast from "../../ErrorToast/ErrorToast";
import { useState } from "react";

const EditModal = (props) => {
  const [configPosts, configError, configLoading, configAxiosFetch] =
    useAxiosFunction();
  const [putPosts, putError, putLoading, putAxiosFetch] = useAxiosFunction();
  const [cookies, setCookie] = useCookies(["user"]);
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (props.settingsId) {
      getConfig();
    }
  }, [props.settingsId]);

  const getConfig = () => {
    configAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookies.Token),
      method: "get",
      url: `/configs/get/${props.settingsId}`,
    });
  };
  const onEditSettings = (formData) => {
    putAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookies.Token),
      method: "put",
      url: `configs/update/${props.settingsId}`,
      requestConfig: formData,
    });
    setShowError(true);
  };
  const cleanError = () => {
    setShowError(false);
  };

  if (putPosts.status == "Success") {
    window.location.reload();
  }
  
  return (
    <React.Fragment>
      {putError.response?.data.status == "failed" && showError == true ? (
        <ErrorToast error={putError} cleanError={cleanError} />
      ) : null}
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll", position: "fixed", top: "50" }}
      >
        <Box className={styles.modal}>
          {configPosts && (
            <SettingsForm
              configData={configPosts.data?.config}
              onEditSettings={onEditSettings}
              edit={true}
            />
          )}

          <button className={styles.closeModalBtn} onClick={props.close}>
            بستن
          </button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default EditModal;
