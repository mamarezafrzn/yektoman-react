import React from "react"
import DesktopMenu from "../Menu/desktopMenu/DesktopMenu"
import Navbar from "../Menu/navbar"
import Card from "../UI/Card/Card"
import styles from "./Dashboard.module.css"



const Dashboard = () =>{
    

    return(
        <React.Fragment>
            
            <Navbar/>
            <DesktopMenu/>
        
            <Card heading="داشبورد" description="لیست صندوق های شما">
                <div className={styles.cardItemContainer}>
                    
                    <div className={styles.cardItemBody}>
                        <div className={styles.mainDescription}>
                            <div className={styles.mainDescriptionHeading}>
                                <p className={styles.cardHeading}>تست</p>
                                <p className={styles.headingDescription}>سر گروه: شهریار</p>
                            </div>
                            <div className={styles.cardDetails}>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.editBtn}>
                            <button>mamad</button>
                        </div>
                    </div>
                    <div className={styles.cardItemFooter}></div>
                </div>

            </Card>
        </React.Fragment>
    )

}


export default Dashboard