import React, { useEffect } from "react";
import { Outlet, redirect, Route, Routes, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const RegisterRouter = (props) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    debugger
    if (cookies.Token) {
      navigate("/dashboard");
    }
  });
  return (
    <React.Fragment>
      <Outlet></Outlet>
    </React.Fragment>
  );
};

export default RegisterRouter;
