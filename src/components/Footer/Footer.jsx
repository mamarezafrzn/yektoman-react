import Icofont from "react-icofont"
import logoSmall from "../../assets/img/logo_small.png"


const Footer = () =>{
    return(
        <footer className="footer-area" id="contact-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="single-footer-widget">
                        <div className="logo">
                            <a href="#"><img src={logoSmall} alt="image"/></a>
                        </div>
    
                    </div>
                </div>
    
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="single-footer-widget ml-4 pl-5">
                        <h3>دسترسی سریع</h3>
    
                        <ul className="list">
    
                            <li ><a href="#home-section" className="nav-link active">خانه</a></li>
                            <li ><a href="#features-section" className="nav-link">ویژگیها</a></li>
                            <li ><a href="#about-section" className="nav-link">درباره ما</a></li>
                            <li ><a href="#blog-section" className="nav-link">مقالات</a></li>
                            <li ><a href="#contact-section" className="nav-link">ارتباط با ما</a></li>
                        </ul>
                    </div>
                </div>
    
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="single-footer-widget ml-4">
                        <h3>شبکه اجتماعی</h3>
    
                        <ul className="social-links">
                            <li><a href="https://facebook.com"><i className="icofont-facebook"></i></a></li>
                            <li><a href="https://twitter.com"><i className="icofont-twitter"></i></a></li>
                            <li><a href="https://telegram.com"><i className="icofont-telegram"></i></a></li>
                            <li style={{marginRight:"2px"}}><a href="https://instagram.com"><i className="icofont-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
    
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="single-footer-widget">
                        <h3>ارتباط با ما</h3>
    
                        <ul className="get-in-touch">
                            <li style={{marginBottom:"30px"}}><i className="icofont-home"></i>ایران ، تهران</li>
                            <li style={{marginBottom:"30px"}}><i className="icofont-live-support"></i> <a href="tel:02188971898">021-88971898</a></li>
                            <li style={{marginBottom:"30px"}}><i className="icofont-envelope"></i> <a href="mailto:info@yektoman.ir">info@yektoman.ir</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    
        <div className="copyright-area">
            <div className="container">
    
    
                <p><i className="icofont-copyright"></i>  <script>document.write(new Date().getFullYear());</script> تمام حقوق  محفوظ است. <a href="https://apachish.com" target="_blank">Apachish</a>  </p>
            </div>
        </div>
    </footer>
    )
}

export default Footer