import mapImg from "../../assets/img/map.png"

const FunFacts = () =>{
    return(
        <section className="funfacts-area ptb-110 bg-fcfbfb">
        <div className="container">
            <div className="section-title">
                <h2>ما همیشه سعی می کنیم انتظارات کاربران را درک کنیم</h2>
            </div>
    
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                    <div className="funfact">
                        <h3><span style={{direction:"ltr"}} className="odometer" data-count="180">00</span>+</h3>
                        <p>تعداد مشتری</p>
                    </div>
                </div>
    
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                    <div className="funfact">
                        <h3><span style={{direction:"ltr"}} className="odometer" data-count="20">00</span>+</h3>
                        <p>تعداد صندوق ها</p>
                    </div>
                </div>
    
    
            </div>
    
            <div className="contact-cta-box">
                <h3>سوالی دربارۀ ما دارید؟</h3>
                <p>برای تماس با ما صبر نکنید!</p>
                <a href="index-2.html#" className="btn btn-primary">تماس با ما</a>
            </div>
    
            <div className="map-bg">
                <img src={mapImg} alt="map"/>
            </div>
        </div>
    </section>
    )
}

export default FunFacts