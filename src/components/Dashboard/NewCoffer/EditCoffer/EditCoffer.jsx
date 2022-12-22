import React, { useEffect, useState } from "react";
import CofferForm from "../CofferForm/CofferForm";
import useAxiosFunction from "../../../../axiosFetch/useAxiosFunction";
import { useCookies } from "react-cookie";
import baseUrlWithAuthFunc from "../../../../apis/axiosBaseWithAuth";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../../../ErrorToast/ErrorToast";
import { Helmet } from "react-helmet";

const EditCoffer = (props) => {
  const [getPosts, getError, getLoading, getAxiosFetch] = useAxiosFunction();
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [cookies, setCookie] = useCookies(["user"]);
  const [showError, setShowError] = useState(true);
  const Navigate = useNavigate();

  const getFundItem = () => {
    getAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookies.Token),
      method: "get",
      url: `/funds/get/${props.fundId}`,
    });
  };

  useEffect(() => {
    getFundItem();

    // eslint-disable-next-line
  }, []);

  const editFunds = (formData) => {
    axiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookies.Token),
      method: "put",
      url: `funds/update/${props.fundId}`,
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
      <Helmet>
      <title>یک تومن |‌ ویرایش صندوق</title>
      </Helmet>
      {error.response?.data.status == "failed" && showError == true ? (
        <ErrorToast error={error} cleanError={cleanError} />
      ) : null}
      {getPosts.data && (
        <CofferForm
          isEdit={props.isEdit}
          fundData={getPosts.data?.fund}
          postData={editFunds}
        />
      )}
    </React.Fragment>
  );
};

export default EditCoffer;
