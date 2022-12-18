import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ErrorToast = (props) => {
  console.log(props)
  useEffect(() => {

      const errors = [];
      if (props.error.response.data.meta.code === 400) {
          errors.push(props.error.response.data.meta.message);
        }
        if (props.error.response.data.meta.code === 422) {
            Object.keys(props.error.response.data.data).map((item) => {
                errors.push(props.error.response.data.data[item]);
            });
         
        }
       
    const notify = () =>
      toast.error(
        <ul style={{textAlign:"right",direction:"rtl"}}>
          {errors?.map((item,index) => (
              <li key={index}>{item[1] ? item[1] : item}</li>     
              ))}
        </ul>,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 60000,
          onClick:()=>{props.cleanError()},delay:2000,
        }
      );
    notify();
  }, []);

  return <ToastContainer limit={1} rtl closeButton={false}/>;
};

export default ErrorToast;
