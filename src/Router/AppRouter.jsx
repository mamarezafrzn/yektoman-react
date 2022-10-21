import {Routes,Route} from "react-router-dom"
import App from "../App";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const AppRouter = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home/>} exact={true}/>
            <Route path="/login" element={<Login/>} exact={true}/>
            <Route path="/register" element={<Register/>} exact={true}/>
        </Routes>
    )
}


export default AppRouter;