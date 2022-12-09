import { useNavigate } from "react-router-dom"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from "react";
import styles from "./BackBtn.module.css"


const BackBtn = (props) =>{
    const navigate = useNavigate()
    
    const onBackClick = () =>{
        navigate(-1)
        // this.props.history.goBack()
    }

    return(
        <React.Fragment>
            <div className={styles.backBtnContainer}>
                <button className={styles.backBtn} onClick={onBackClick}>
                <ArrowBackIosIcon sx={{ fontSize: 15,cursor:"pointer" }}/>
                <p>بازگشت</p>
                </button>

            </div>
        </React.Fragment>
    )
}


export default BackBtn