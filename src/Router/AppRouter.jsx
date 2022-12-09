import React from "react";
import { useCookies } from "react-cookie";
import {Routes,Route, Router, useNavigate} from "react-router-dom"
import App from "../App";
import Dashboard from "../components/Dashboard/Dashboard";
import Join from "../components/Dashboard/Join/Join";
import Newcoffer from "../components/Dashboard/NewCoffer/NewCoffer";
import Notifications from "../components/Dashboard/Notifications/Notifications";
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
    const [cookies,setCookies] = useCookies(['user'])
    const navigate = useNavigate()

    const passToDashboard = () =>{
        navigate("/dashboard")
    }
    return(
        <React.Fragment>
            <Routes>
            <Route path="/" element={<Home/>} exact={true}/>
            <Route element={<DashboardRouter/>} >
                <Route path="/dashboard" element={<Dashboard/>} exact={true}/>
                <Route path="/dashboard/create-coffer" element={<Newcoffer/>} exact={true}/>
                <Route path="/dashboard/join" element={<Join/>} exact={true}/>
                <Route path="/dashboard/notifications" element={<Notifications/>} exact={true}/>
                <Route path="/dashboard/transactions" element={<Transactions/>} exact={true}/> 
                <Route path="/dashboard/settings" element={<Settings/>} exact={true}/>
                <Route path="/dashboard/profile" element={<Profile/>} exact={true}/>
                <Route path="/dashboard/user-list" element={<UserList/>} exact={true}/>
            </Route>
            <Route element={<RegisterRouter/>}>
                <Route path="/login" element={<Login/>} exact={true}/>
                <Route path="/register" element={<Register/>} exact={true}/>
                <Route path="/login/with-password" element={<WithPassword/>} exact={true}/>
                <Route path="/login/with-code" element={<WithCode/>} exact={true}/>
                <Route path="/register" element={<Register/>} exact={true}/>
                <Route path="/register/verification" element={<RegisterVerification/>}/>
                <Route path="/verify" element={<Verify/>} exact={true}/>
                <Route path="/forget-password" element={<ForgetPassword/>} exact={true}/>
            </Route>
            </Routes>                   
            </React.Fragment>
    )
}


export default AppRouter;