import styles from "./UserList.module.css";
import { Box, Modal } from "@mui/material";
import { useEffect } from "react";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";
import ModalForm from "./ModalForm";
import ErrorToast from "../../ErrorToast/ErrorToast";
import { useState } from "react";

const UserModal = (props) => {
  const [userPosts, userError, userLoading, userAxiosFetch] =
    useAxiosFunction();
  const [editPosts, editError, editLoading, editAxiosFetch] =
    useAxiosFunction();
  const [cookie, setCookie] = useCookies(["user"]);
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (props.userId) {
      getUser();
    }
  }, [props.userId]);

  const getUser = () => {
    userAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: `/users/get/${props.userId}`,
    });
  };

  const postUser = (formData) => {
    editAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "put",
      url: `/users/update/${props.userId}`,
      requestConfig: formData,
    });
  };

  const editUser = (formData) => {
    console.log(formData);
    postUser(formData);
  };
  const cleanError = () => {
    setShowError(false);
  };
  if(editPosts.status == "Success"){
    window.location.reload()
  }
  return (
    <Modal
      open={props.openModal}
      onClose={props.openModalHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: "scroll", position: "fixed", top: "50" }}
    >
      <Box className={styles.modal}>
        {userPosts && (
          <ModalForm userData={userPosts.data?.user} editUser={editUser} userId={props.userId}/>
        )}
        {editError.response?.data.status == "failed" && showError == true ? (
          <ErrorToast error={editError} cleanError={cleanError} />
        ) : null}
        
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

export default UserModal;
