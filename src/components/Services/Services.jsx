import img11 from "../../assets/img/11.png";
import services1 from "../../assets/img/services1.jpg";
import services2 from "../../assets/img/services2.jpg";
import services3 from "../../assets/img/services3.jpg";

const Services = () => {
    return(
        <section className="services-area">
    <div className="container-fluid">
      <div className="row m-0">
        <div className="col-lg-5 p-0">
          <div className="services-inner">
            <div className="services-section-title">
              <h2>ارائه بهترین خدمات</h2>
              <div className="bar"></div>
              <p>
                برای بهترین خدمات به شما تمام تلاش خود رای برای رضایت شما انجام
                می دهیم
              </p>
              <img src={img11} alt="image" />
            </div>
          </div>
        </div>

        <div className="col-lg-7 p-0">
          <div className="services-list">
            <div className="services-slides owl-carousel owl-theme">
              <div className="single-services">
                <img src={services1} alt="image" />

                <div className="content">
                  <div className="icon">
                    <i className="pe-7s-magnet"></i>
                  </div>

                  <h3>رابط کاربری</h3>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است.
                  </p>
                  <a href="index.html#" className="read-more-btn">
                    بیشتر بخوانید
                  </a>
                </div>
              </div>

              <div className="single-services">
                <img src={services2} alt="image" />

                <div className="content">
                  <div className="icon">
                    <i className="pe-7s-vector"></i>
                  </div>

                  <h3>طراحی با ظرافت</h3>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است.
                  </p>
                  <a href="index.html#" className="read-more-btn">
                    بیشتر بخوانید
                  </a>
                </div>
              </div>

              <div className="single-services">
                <img src={services3} alt="image" />

                <div className="content">
                  <div className="icon">
                    <i className="pe-7s-scissors"></i>
                  </div>

                  <h3>بهینه و استاندارد</h3>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است.
                  </p>
                  <a href="index.html#" className="read-more-btn">
                    بیشتر بخوانید
                  </a>
                </div>
              </div>

              <div className="single-services">
                <img src={services3} alt="image" />

                <div className="content">
                  <div className="icon">
                    <i className="pe-7s-diamond"></i>
                  </div>

                  <h3>خاص و بروز</h3>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است.
                  </p>
                  <a href="index.html#" className="read-more-btn">
                    بیشتر بخوانید
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    )
};

export default Services;
