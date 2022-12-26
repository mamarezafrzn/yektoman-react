import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import styles from "./Profile.module.css";
import idCard from "../../../assets/img/jokes-13th-1.jpg";
import { Helmet } from "react-helmet";
import useAxiosFunction from "../../../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../../../apis/axiosBaseWithAuth";
import { useCookies } from "react-cookie";
import ProfileForm from "./ProfileForm";
import { Box, Modal } from "@mui/material";

const Profile = (props) => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [avatarPosts, avatarError, avatarLoading, avatarAxiosFetch] =
    useAxiosFunction();
  const [
    certificatePosts,
    certificateError,
    certificateLoading,
    certificateAxiosFetch,
  ] = useAxiosFunction();
  const [
    nationalCardPosts,
    nationalCardError,
    nationalCardLoading,
    nationalCardAxiosFetch,
  ] = useAxiosFunction();
  const [cookie, setCookie] = useCookies(["user"]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const [open, setOpen] = useState(false);

  // --------------------------------- image resize -------------------------------------------//

  const showImg = (imageData,size) => {
    let mainData = "";
    if (imageData.length > 1) {
      const getEmbedSrc = (embedStr) => {
        const div = document.createElement("div");
        div.innerHTML = embedStr;
        let dataVal;
        if (div.querySelector("img")) {
          dataVal = div.querySelector("img");
        } else {
          dataVal = div.querySelector("embed");
        }
        return dataVal.src;
      };

      const srcEmbed = getEmbedSrc(imageData);
      const splitData = srcEmbed.split(/[,:;]+/);
      let contentType = splitData[1];
      let b64Data = splitData[3];

      function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || "";
        sliceSize = sliceSize || 512 ;


        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (
          var offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
      }

      let blob = b64toBlob(b64Data, contentType);
      let blobUrl = URL.createObjectURL(blob);
      if (certificatePosts.indexOf("img") !== -1) {
        mainData = React.createElement("img", { src: blobUrl, alt: "img" });
      }

      if (certificatePosts.indexOf("embed") !== -1) {
        mainData = React.createElement("embed", { src: blobUrl });
      }
    }
    return mainData;
  };

  // --------------------------------------------------------------------------------------------//

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (posts?.data?.user?.profile?.image_certificate) {
      getImageCertificate();
    }
    if (posts?.data?.user?.profile?.avatar) {
      getAvatar();
    }
    if (posts?.data?.user?.profile?.image_national_code) {
      getNationalCard();
    }
  }, [posts]);
  const getProfile = () => {
    axiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: `/profile`,
    });
  };

  const getImageCertificate = () => {
    certificateAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: posts?.data?.user?.profile?.image_certificate,
    });
  };
  const getAvatar = () => {
    avatarAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: posts?.data?.user?.profile?.avatar,
    });
  };
  const getNationalCard = () => {
    nationalCardAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookie.Token),
      method: "get",
      url: posts?.data?.user?.profile?.image_national_code,
    });
  };

  const showModal = (item) => {
    if (item == "id") {
      setShowIdCard(true);
    }
    if (item == "certificate") {
      setShowCertificate(true);
    }
    setOpen(true);
  };
  const hideModal = () => {
    setShowCertificate(false);
    setShowIdCard(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>یک تومن |‌ پروفایل</title>
      </Helmet>
      <Modal
        open={open}
        onClose={hideModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll", position: "fixed", top: "50" }}
      >
        <Box className={styles.modal}>
          {showIdCard && showImg(nationalCardPosts,1024)}
          {showCertificate && showImg(certificatePosts,1024)}
        </Box>
      </Modal>
      <Card
        heading="پروفایل "
        description="نمایش و ویرایش اطلاعات شخصی"
        containerStyle={{ width: "50%" }}
      >
        {posts && <ProfileForm formData={posts.data?.user} />}
      </Card>
      <div className={styles.cardContainer}>
        <div
          className={styles.cardHeader}
          // style={
          //   avatarPosts
          //     ? { backgroundImage: `url(${showImg(avatarPosts).src})` }
          //     : { backgroundColor: "rgb(19, 151, 151)" }
          // }
        >
          {showImg(avatarPosts)}
          <div className={styles.headerTitle}>
            <h1 className={styles.heading}>{props.heading}</h1>
            <h4 className={styles.description}>{props.description}</h4>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.userInfo}>
            <p className={styles.userHeader}>{posts?.data?.user?.name}</p>
            <p>شماره موبایل: {posts?.data?.user?.mobile}</p>
            <p>کد ملی: {posts?.data?.user?.national_code}</p>
          </div>
          <div className={styles.cardPics}>
            <div>
              <p>عکس کارت ملی</p>
              {nationalCardPosts ? (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => showModal("id")}
                >
                  {showImg(nationalCardPosts)}
                </div>
              ) : (
                <p style={{ paddingLeft: "10px", color: "rgb(60, 26, 26)" }}>
                  عکسی آپلود نشده
                </p>
              )}
            </div>
            <div>
              <p> عکس شناسنامه</p>
              {certificatePosts ? (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => showModal("certificate")}
                >
                  {showImg(certificatePosts)}
                </div>
              ) : (
                <p style={{ paddingLeft: "10px", color: "rgb(60, 26, 26)" }}>
                  عکسی آپلود نشده
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
