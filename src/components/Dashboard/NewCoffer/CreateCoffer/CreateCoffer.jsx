import React, { useState } from "react";
import CofferForm from "../CofferForm/CofferForm";
import useAxiosFunction from "../../../../axiosFetch/useAxiosFunction";
import { useCookies } from "react-cookie";
import baseUrlWithAuthFunc from "../../../../apis/axiosBaseWithAuth";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import ErrorToast from "../../../ErrorToast/ErrorToast";

const CreateCoffer = (props) => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [cookies, setCookie] = useCookies(["user"]);
  const [showError, setShowError] = useState(true);
  const Navigate = useNavigate();

  const postData = (formData) => {

    axiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookies.Token),
      method: "post",
      url: "/funds/store",
      requestConfig: {
        title: formData.title,
        num_member: formData.num_member,
        price: formData.price,
        every_few_day_lottery: formData.every_few_day_lottery,
        start_date: `${formData.start_date}`,
      },
    });
    setShowError(true);
  };
  const cleanError = () => {
    setShowError(false);
  };
  if (posts.status == "Success") {
    Navigate("/dashboard");
  }

  return (
    <React.Fragment>
      {error.response?.data.status == "failed" && showError == true ? (
        <ErrorToast error={error} cleanError={cleanError} />
      ) : null}
      <CofferForm postData={postData} isEdit={props.isEdit} />
    </React.Fragment>
  );
};

export default CreateCoffer;
