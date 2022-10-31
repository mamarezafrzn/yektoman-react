import {Routes,Route} from "react-router-dom"
import App from "../App";
import Dashboard from "../components/Dashboard/Dashboard";
import Join from "../components/Dashboard/Join/Join";
import Newcoffer from "../components/Dashboard/NewCoffer/NewCoffer";
import Notifications from "../components/Dashboard/Notifications/Notifications";
import Transactions from "../components/Dashboard/Transactions/Transactions";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import WithCode from "../components/Login/WithCode/WithCode";
import WithPassword from "../components/Login/WithPassword/WithPassword";
import Register from "../components/Register/Register";
import Verify from "../components/Verify/Verify";



const AppRouter = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home/>} exact={true}/>
            <Route path="/login" element={<Login/>} exact={true}/>
            <Route path="/register" element={<Register/>} exact={true}/>
            <Route path="/login/with-password" element={<WithPassword/>} exact={true}/>
            <Route path="/login/with-code" element={<WithCode/>} exact={true}/>
            <Route path="/register" element={<Register/>} exact={true}/>
            <Route path="/verify" element={<Verify/>} exact={true}/>
            <Route path="/dashboard" element={<Dashboard/>} exact={true}/>
            <Route path="/dashboard/create-coffer" element={<Newcoffer/>} exact={true}/>
            <Route path="/dashboard/join" element={<Join/>} exact={true}/>
            <Route path="/dashboard/notifications" element={<Notifications/>} exact={true}/>
            <Route path="/dashboard/transactions" element={<Transactions/>} exact={true}/>
        </Routes>
    )
}


export default AppRouter;