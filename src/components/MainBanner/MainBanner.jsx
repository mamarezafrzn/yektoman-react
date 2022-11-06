import { Link } from "react-router-dom"
import undraw_investing from "../../assets/img/undraw_investing_7u74.svg"


const MainBanner = () =>{
    return(
        <div className="main-banner item-bg1" id="home-section">
        <div className="d-table">
            <div className="d-table-cell">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="main-banner-content">
                                <span>یک تومن</span>
                                <h1>باهم درکنار هم</h1>
                                <p className="perp">
    
                                    با نیت خیر خواهانه، به کمک یگدیگر زندگی خود را میسازیم، نرم افزار
                                    یک تومن جهت تسهیل در اجرای روند صندوق دوستانه و فامیلی ایجاد شده است
                                </p>
    
                                <Link to="/login" className="btn btn-primary">ورود</Link>
                                <Link to="/register" className="btn btn-secondary">شروع کنید</Link>
                            </div>
                        </div>
    
                        <div className="col-lg-6">
                            <div className="banner-image">
                                <img src={undraw_investing} alt="image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default MainBanner