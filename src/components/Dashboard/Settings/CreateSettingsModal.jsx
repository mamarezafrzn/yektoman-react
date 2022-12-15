import { Box, Modal } from "@mui/material";
import styles from "./Settings.module.css";
import SettingsForm from "./SettingsForm";
import { useCookies } from "react-cookie";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";

const CreateSettingsModal = (props) => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [cookies, setCookie] = useCookies(["user"]);
  const onCreateSetting = (formData) => {
    axiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookies.Token),
      method: "post",
      url: "/configs/store",
      requestConfig: formData,
    });
  };
  if(posts.status == "Success"){
    window.location.reload()
  }

  // console.log(posts)
  return (
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
  );
};

export default CreateSettingsModal;
