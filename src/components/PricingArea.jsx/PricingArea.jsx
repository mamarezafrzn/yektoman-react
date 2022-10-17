

const PricingArea = () =>{
    return(
        <section className="pricing-area ptb-110 bg-f9f6f6" id="plan-section">
        <div className="container">
            <div className="section-title">
                <h2>پلن های ما</h2>
                <p>پلن های یک تومان به شرح زیر می باشد:</p>
            </div>
    
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="pricing-table">
                        <div className="pricing-header">
                            <h3>پلن اولیه</h3>
                        </div>
    
                        <div className="price">
                            <span>رایگان</span>
                        </div>
    
                        <div className="pricing-features">
                            <ul>
                                <li className="active">یک صندوق</li>
                                <li className="active">۱۰۰ پیامک</li>
                                <li className="active">زیر مجموعه ۵۰</li>
                                <li className="active">پشتیبانی روزانه</li>
                                <li className="active">آمار و ارقام</li>
                            </ul>
                        </div>
    
                        <div className="pricing-footer">
                            <a href="" className="btn btn-primary">خرید پلن</a>
                        </div>
                    </div>
                </div>
    
                <div className="col-lg-4 col-md-6">
                    <div className="pricing-table active-plan">
                        <div className="pricing-header">
                            <h3>پلن اقتصادی</h3>
                        </div>
    
                        <div className="price">
                            <span>۴۰،۰۰۰ <sup>تومان</sup><span>/ ماه</span></span>
                        </div>
    
                        <div className="pricing-features">
                            <ul>
                                <li className="active">صندوق نامحدود</li>
                                <li className="active">نامحدود پیامک</li>
                                <li className="active">زیرمجموعه نامحدود</li>
                                <li className="active"> درگاه بانک</li>
                                <li className="active">پشتیبانی روزانه</li>
                                <li className="active">آمار و ارقام</li>
                            </ul>
                        </div>
    
                        <div className="pricing-footer">
                            <a href="" className="btn btn-primary">خرید پلن</a>
                        </div>
                    </div>
                </div>
    
                <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
                    <div className="pricing-table">
                        <div className="pricing-header">
                            <h3>پلن طلایی</h3>
                        </div>
    
                        <div className="price">
                            <span>65000 <sup>تومان</sup><span>/ ماه</span></span>
                        </div>
    
                        <div className="pricing-features">
                            <ul>
                                <li className="active">صندوق نامحدود</li>
                                <li className="active">۲۰۰۰ پیامک</li>
                                <li className="active">زیرمجموعه نامحدود</li>
                                <li className="active"> شخصی درگاه بانک</li>
                                <li className="active">پشتیبانی 24 ساعته</li>
                                <li className="active">آمار و ارقام</li>
                            </ul>
                        </div>
    
                        <div className="pricing-footer">
                            <a href="" className="btn btn-primary">خرید پلن</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default PricingArea