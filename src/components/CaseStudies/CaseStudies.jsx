import case_studies_shape1 from "../../assets/img/case-studies-shape1.png";
import case_studies_shape2 from "../../assets/img/case-studies-shape2.png";
import case_studies_shape3 from "../../assets/img/case-studies-shape3.png";
import case_studies_shape4 from "../../assets/img/case-studies-shape4.png";
import case_studies_shape5 from "../../assets/img/case-studies-shape5.png";
import case_studies_shape6 from "../../assets/img/case-studies-shape6.png";

const CaseStudies = () =>{
    return(
        <section className="case-studies-area ptb-110">
        <div className="container">
            <div className="section-title mt-5">
                <h2>ویژگی ها</h2>
                <p>خدماتی که ما در سامانه یک تومن به شما ارائه می دهیم</p>
            </div>
    
            <div className="tab">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <ul className="tabs">
    
                        </ul>
                    </div>
    
                    <div className="col-lg-12 col-md-12">
                        <div className="tab_content">
                            <div className="tabs_item">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="single-case-studies bg1">
                                            <div className="content">
                                                <h3>درگاه بانک</h3>
                                            </div>
    
    
                                            <div className="shape"><img src={case_studies_shape1} alt="shape"/></div>
                                        </div>
                                    </div>
    
                                    <div className="col-lg-4 col-md-6">
                                        <div className="single-case-studies bg2">
                                            <div className="content">
                                                <h3>ایجاد صندوق</h3>
                                            </div>
                                            <div className="shape"><img src={case_studies_shape2} alt="shape"/></div>
                                        </div>
                                    </div>
    
                                    <div className="col-lg-4 col-md-6">
                                        <div className="single-case-studies bg3">
                                            <div className="content">
                                                <h3>مدیریت حساب</h3>
                                            </div>
                                            <div className="shape"><img src={case_studies_shape3} alt="shape"/></div>
                                        </div>
                                    </div>
    
                                    <div className="col-lg-4 col-md-6">
                                        <div className="single-case-studies bg4">
                                            <div className="content">
                                                <h3>خدمات پیامکی</h3>
                                            </div>
                                            <div className="shape"><img src={case_studies_shape4} alt="shape"/></div>
                                        </div>
                                    </div>
    
                                    <div className="col-lg-4 col-md-6">
                                        <div className="single-case-studies bg5">
                                            <div className="content">
                                                <h3>اعلان</h3>
                                            </div>
    
    
                                            <div className="shape"><img src={case_studies_shape5} alt="shape"/></div>
                                        </div>
                                    </div>
    
                                    <div className="col-lg-4 col-md-6">
                                        <div className="single-case-studies bg6">
                                            <div className="content">
                                                <h3>پشتیبانی ۲۴ ساعته</h3>
                                            </div>
                                            <div className="shape"><img src={case_studies_shape6} alt="shape"/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default CaseStudies