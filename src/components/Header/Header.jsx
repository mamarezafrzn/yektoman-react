import logo from "../../assets/img/logo_small.png";

const Header = () => {
  return (
    <header className="header-area">
      <div className="uxhaven-mobile-nav">
        <div className="logo">
          <a href="">
            <img src={logo} alt="logo" width="100" height="100" />
          </a>
        </div>
      </div>

      <div className="uxhaven-nav">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <a className="navbar-brand" href="">
              <img src={logo} width="100" height="100" alt="logo" />
            </a>

            <div
              className="collapse navbar-collapse mean-menu"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav nav">
                <li className="nav-item">
                  <a href="#home-section" className="nav-link active">
                    خانه
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#features-section" className="nav-link">
                    ویژگیها
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#about-section" className="nav-link">
                    درباره ما
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#plan-section" className="nav-link">
                    اشتراک ها
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#blog-section" className="nav-link">
                    اخبار
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#contact-section" className="nav-link">
                    ارتباط با ما
                  </a>
                </li>

                {/*                        <li className="nav-item"><a href="#" className="nav-link active">صفحه اصلی</a>*/}
                {/*                            <ul className="dropdown-menu">*/}
                {/*                                <li className="nav-item"><a href="index.html" className="nav-link">صفحه اصلی اول</a></li>*/}

                {/*                                <li className="nav-item"><a href="index-2.html" className="nav-link">صفحه اصلی دوم</a></li>*/}

                {/*                                <li className="nav-item"><a href="index-3.html" className="nav-link">صفحه اصلی سوم</a></li>*/}

                {/*                                <li className="nav-item"><a href="index-4.html" className="nav-link">صفحه اصلی چهارم</a></li>*/}

                {/*                                <li className="nav-item"><a href="index-5.html" className="nav-link">صفحه اصلی پنجم</a></li>*/}

                {/*                                <li className="nav-item"><a href="index-6.html" className="nav-link active">صفحه اصلی ششم</a></li>*/}

                {/*                                <li className="nav-item"><a href="index-7.html" className="nav-link">صفحه اصلی هفتم</a></li>*/}

                {/*                                <li className="nav-item"><a href="index-8.html" className="nav-link">صفحه اصلی هشتم</a></li>*/}

                {/*                            </ul>*/}
                {/*                        </li>*/}

                {/*                        <li className="nav-item"><a href="index.html#" className="nav-link">مطالعات موردی</a>*/}
                {/*                            <ul className="dropdown-menu">*/}
                {/*                                <li className="nav-item"><a href="case-studies.html" className="nav-link">مطالعات موردی</a></li>*/}

                {/*                                <li className="nav-item"><a href="case-studies-details.html" className="nav-link">جزئیات مطالعات موردی</a></li>*/}
                {/*                            </ul>*/}
                {/*                        </li>*/}

                {/*                        <li className="nav-item"><a href="index.html#" className="nav-link">خدمات</a>*/}
                {/*                            <ul className="dropdown-menu">*/}
                {/*                                <li className="nav-item"><a href="services.html" className="nav-link">خدمات</a></li>*/}

                {/*                                <li className="nav-item"><a href="services-details.html" className="nav-link">جزئیات خدمات</a></li>*/}
                {/*                            </ul>*/}
                {/*                        </li>*/}

                {/*                        <li className="nav-item"><a href="index.html#" className="nav-link">صفحات</a>*/}
                {/*                            <ul className="dropdown-menu">*/}
                {/*                                <li className="nav-item"><a href="about.html" className="nav-link">درباره ما</a></li>*/}

                {/*                                <li className="nav-item"><a href="services.html" className="nav-link">خدمات</a></li>*/}

                {/*                                <li className="nav-item"><a href="index.html#" className="nav-link">نمونه کار ها</a>*/}
                {/*                                    <ul className="dropdown-menu">*/}
                {/*                                        <li className="nav-item"><a href="portfolio.html" className="nav-link">نمونه کار ها</a></li>*/}

                {/*                                        <li className="nav-item"><a href="single-portfolio.html" className="nav-link">جزئیات نمونه کار</a></li>*/}
                {/*                                    </ul>*/}
                {/*                                </li>*/}

                {/*                                <li className="nav-item"><a href="team.html" className="nav-link">تیم</a></li>*/}

                {/*                                <li className="nav-item"><a href="pricing.html" className="nav-link">قیمت ها</a></li>*/}

                {/*                                <li className="nav-item"><a href="faq.html" className="nav-link">سوالات متداول</a></li>*/}

                {/*                                <li className="nav-item"><a href="error.html" className="nav-link">صفحه 404</a></li>*/}

                {/*                                <li className="nav-item"><a href="contact-1.html" className="nav-link">تماس با ما</a></li>*/}
                {/*                            </ul>*/}
                {/*                        </li>*/}

                {/*                        <li className="nav-item"><a href="index.html#" className="nav-link">نمونه کار ها</a>*/}
                {/*                            <ul className="dropdown-menu">*/}
                {/*                                <li className="nav-item"><a href="portfolio.html" className="nav-link">نمونه کار ها</a></li>*/}

                {/*                                <li className="nav-item"><a href="single-portfolio.html" className="nav-link">جزئیات نمونه کار</a></li>*/}
                {/*                            </ul>*/}
                {/*                        </li>*/}

                {/*                        <li className="nav-item"><a href="index.html#" className="nav-link">بلاگ</a>*/}
                {/*                            <ul className="dropdown-menu">*/}
                {/*                                <li className="nav-item"><a href="blog-1.html" className="nav-link">بلاگ 1</a></li>*/}

                {/*                                <li className="nav-item"><a href="blog-2.html" className="nav-link">بلاگ 3</a></li>*/}

                {/*                                <li className="nav-item"><a href="single-blog.html" className="nav-link">صفحه مطالب</a></li>*/}
                {/*                            </ul>*/}
                {/*                        </li>*/}

                {/*                        <li className="nav-item"><a href="index.html#" className="nav-link">تماس با ما</a>*/}
                {/*                            <ul className="dropdown-menu">*/}
                {/*                                <li className="nav-item"><a href="contact-1.html" className="nav-link">تماس با ما 1</a></li>*/}

                {/*                                <li className="nav-item"><a href="contact-2.html" className="nav-link">تماس با ما 2</a></li>*/}
                {/*                            </ul>*/}
                {/*                        </li>*/}
              </ul>
            </div>

            <div className="others-options">
              <nav className="navbar navbar-expand-md navbar-light text-text-info">
                <div
                  className="collapse navbar-collapse mean-menu"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav nav">
                    <li className="nav-item">
                      <a href="index.html#" className="nav-link">
                        <span className="icon-phone_android"></span>
                        تماس با پشتیبانی
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a href="case-studies.html" className="nav-link">
                            <span className="text-primary">
                              <p className="text-center"> از ۸ صبح تا ۱۰ شب</p>
                              <p className="text-center">۷ روز هفته</p>
                              <p className="text-center rtl">
                                <span className="icon-phone"></span>۰۹۱۲۰۲۴۲۷۴۲
                              </p>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
