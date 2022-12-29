import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route, Router, useNavigate } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/Dashboard/Dashboard";
import Join from "../components/Dashboard/Join/Join";
import Newcoffer from "../components/Dashboard/NewCoffer/NewCoffer";
import Notifications from "../components/Dashboard/Notifications/Notifications";
import Payments from "../components/Dashboard/Payments/Payments";
import Profile from "../components/Dashboard/Profile/Profile";
import Settings from "../components/Dashboard/Settings/Settings";
import Transactions from "../components/Dashboard/Transactions/Transactions";
import UserList from "../components/Dashboard/UserList/UserList";
import Home from "../components/Home/Home";
import ForgetPassword from "../components/Login/ForgetPassword/ForgetPassword";
import Login from "../components/Login/Login";
import WithCode from "../components/Login/WithCode/WithCode";
import WithPassword from "../components/Login/WithPassword/WithPassword";
import Register from "../components/Register/Register";
import RegisterVerification from "../components/Register/RegisterVerification";
import Verify from "../components/Verify/Verify";
import DashboardRouter from "./DashboardRouter";
import RegisterRouter from "./RegisterRouter";
import useAxiosFunction from "../axiosFetch/useAxiosFunction";
import baseUrlWithAuthFunc from "../apis/axiosBaseWithAuth";

const AppRouter = () => {
  const [cookies, setCookies] = useCookies(["user"]);
  const [userPosts, userError, userLoading, userAxiosFetch] =
    useAxiosFunction();
  const [permission, setPermission] = useState();
  useEffect(() => {
    fetchUserData();
  }, [cookies.Permission, window.location]);

  if (!permission == true && userPosts.status == "Success") {
    userPosts?.data?.user?.roles.map((item) => {
      item.name == "admin" && setPermission(true);
    });
  }

  const fetchUserData = () => {
    userAxiosFetch({
      axiosInstance: baseUrlWithAuthFunc(cookies.Token),
      method: "get",
      url: "/info",
    });
  };

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<DashboardRouter />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/create-coffer" element={<Newcoffer />} />
          <Route path="/dashboard/join" element={<Join />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/transactions" element={<Transactions />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route
            path="/dashboard/settings"
            element={cookies.Permission || permission ? <Settings /> : <Dashboard />}
          />
          <Route
            path="/dashboard/user-list"
            element={cookies.Permission || permission ? <UserList /> : <Dashboard />}
          />
          <Route path="dashboard/payments" element={<Payments />} />
        </Route>
        <Route element={<RegisterRouter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login/with-password" element={<WithPassword />} />
          <Route path="/login/with-code" element={<WithCode />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/register/verification"
            element={<RegisterVerification />}
          />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default AppRouter;
