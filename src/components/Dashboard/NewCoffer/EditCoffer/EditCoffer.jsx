import React from "react";
import CofferForm from "../CofferForm/CofferForm";
import useAxiosFunction from "../../../../axiosFetch/useAxiosFunction";
import { useCookies } from "react-cookie";
import baseUrlWithAuthFunc from "../../../../apis/axiosBaseWithAuth";



const EditCoffer = (props) =>{
    const [posts, error, loading, axiosFetch] = useAxiosFunction();
    const [getPosts, getError, getLoading, getAxiosFetch] = useAxiosFunction();
    const [cookies, setCookie] = useCookies(["user"]);


    return(
        <React.Fragment>
            <CofferForm isEdit={props.isEdit}/>
        </React.Fragment>
    )
}


export default EditCoffer;