import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import {Routes,Route, Router, useNavigate} from "react-router-dom"
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




const AppRouter = () =>{
    // useEffect(() => {
    //     switch (window.location.pathname) {
    //      case "/":
          
    //       document.title = "یک تومن"
    //        break;
    //      case "/login":
    //         document.title = "یک تومن | ورود"
    //        break;
    //        case "/login/with-password":
    //         document.title = "یک تومن | ورود - با رمز عبور"
    //        break;
    //        case "/login/with-code":
    //         document.title = "یک تومن | ورود - با رمز یکبار مصرف"
    //        break;
    //        case "/register":
    //         document.title = "یک تومن | ثبت نام"
    //        break;
    //        case "/register/verification":
    //         document.title = "یک تومن | تایید ثبت نام"
    //        break;
    //        case "/verify":
    //         document.title = "یک تومن | تایید شماره"
    //        break;
    //        case "/forget-password":
    //         document.title = "یک تومن | فراموشی رمز"
    //        break;
    //        case "/dashboard":
    //         document.title = "یک تومن | داشبورد"
    //        break;
    //        case "/dashboard/create-coffer":
    //         document.title = "یک تومن | ایجاد صندوق"
    //        break;
    //      case "/dashboard/join":
    //         document.title = "یک تومن | عضویت"
    //        break;
    //        case "/dashboard/notifications":
    //         document.title = "یک تومن | اعلانات"
    //        break;
    //        case "/dashboard/transactions":
    //         document.title = "یک تومن | تراکنش ها"
    //        break;
    //        case "/dashboard/settings":
    //         document.title = "یک تومن | تنظیمات"
    //        break;
    //        case "/dashboard/profile":
    //         document.title = "یک تومن | پروفایل"
    //        break;
    //        case "/dashboard/user-list":
    //         document.title = "یک تومن | لیست کاربران"
    //        break;
    //      default:
    //     //    setTitleApp("Home");
    //        break;
    //    }
    //   });


    return(
        <React.Fragment>
            <Routes>
            <Route path="/" element={<Home/>} />
            <Route element={<DashboardRouter/>} >
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/dashboard/create-coffer" element={<Newcoffer/>} />
                <Route path="/dashboard/join" element={<Join/>} />
                <Route path="/dashboard/notifications" element={<Notifications/>} />
                <Route path="/dashboard/transactions" element={<Transactions/>} /> 
                <Route path="/dashboard/settings" element={<Settings/>} />
                <Route path="/dashboard/profile" element={<Profile/>} />
                <Route path="/dashboard/user-list" element={<UserList/>} />
                <Route path="dashboard/payments" element={<Payments/>} />
            </Route>
            <Route element={<RegisterRouter/>}>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login/with-password" element={<WithPassword/>} />
                <Route path="/login/with-code" element={<WithCode/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/register/verification" element={<RegisterVerification/>}/>
                <Route path="/verify" element={<Verify/>} />
                <Route path="/forget-password" element={<ForgetPassword/>} />
            </Route>
            </Routes>                   
            </React.Fragment>
    )
}


export default AppRouter;