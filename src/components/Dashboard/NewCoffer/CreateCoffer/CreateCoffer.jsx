import React from "react";
import CofferForm from "../CofferForm/CofferForm";
import useAxiosFunction from "../../../../axiosFetch/useAxiosFunction";
import { useCookies } from "react-cookie";
import baseUrlWithAuthFunc from "../../../../apis/axiosBaseWithAuth";

const CreateCoffer = (props) => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction();
  const [cookies, setCookie] = useCookies(["user"]);

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
  };
  console.log(error)

  return (
    <React.Fragment>
      <CofferForm postData={postData} isEdit={props.isEdit} />
    </React.Fragment>
  );
};

export default CreateCoffer;
