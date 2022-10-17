

const News = () =>{
    return(
        <section className="blog-area ptb-110" id="blog-section">
    <div className="container">
        <div className="section-title">
            <h2> آخرین اخبار اقتصادی</h2>
        </div>

        <div className="row">
            <div className="col-lg-6 col-md-12">
                <div className="single-blog-post mb-0">
                    <div className="post-image">
                        <a href=""><img src="" alt=""/></a>
                    </div>

                    <div className="post-content">
                        <ul className="post-meta">
                            <li><i className="icofont-tags"></i> <a href="">
                                {/* {{data_get($news,"0.suptitle")}} */}
                                </a></li>
                            <li><i className="icofont-calendar"></i>
                            {/* {{data_get($news,"0.date")}} */}
                            </li>
                        </ul>

                        <h3 className="mb-0"><a href="">
                            {/* {{data_get($news,"0.title")}}  */}
                            </a></h3>
                        <p>
                         {/* {{data_get($news,"0.lead")}} */}
                        </p>

                    </div>
                </div>
            </div>

            <div className="col-lg-6 col-md-12">
                <div className="blog-item-box">
                    <div className="blog-item">
                        <div className="row align-items-center">
                            <div className="col-lg-4 col-md-3 col-sm-4">
                                <div className="post-image">
                                    <a href=""><img src="" alt=""/></a>
                                </div>
                            </div>

                            <div className="col-lg-8 col-md-9 col-sm-8">
                                <div className="post-content">
                                    <ul className="post-meta">
                                        <li><i className="icofont-tags"></i> <a href="">
                                            {/* {{data_get($news,"1.suptitle")}} */}
                                            </a></li>
                                        <li><i className="icofont-calendar"></i>
                                        {/* {{data_get($news,"1.date")}} */}
                                        </li>
                                    </ul>

                                    <h3><a href="">
                                        {/* {{data_get($news,"1.title")}} */}
                                        </a></h3>
                                    <p>
                                        {/* {{data_get($news,"1.lead")}} */}
                                        </p>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="blog-item">
                        <div className="row align-items-center">
                            <div className="col-lg-4 col-md-3 col-sm-4">
                                <div className="post-image">
                                    <a href=""><img src="" alt=""/></a>
                                </div>
                            </div>

                            <div className="col-lg-8 col-md-9 col-sm-8">
                                <div className="post-content">
                                    <ul className="post-meta">
                                        <li><i className="icofont-tags"></i> <a href="">
                                            {/* {{data_get($news,"2.suptitle")}} */}
                                            </a></li>
                                        <li><i className="icofont-calendar"></i>
                                        {/* {{data_get($news,"2.date")}} */}
                                        </li>
                                    </ul>

                                    <h3><a href="">
                                        {/* {{data_get($news,"2.title")}} */}
                                        </a></h3>
                                    <p>
                                        {/* {{data_get($news,"2.lead")}} */}
                                        </p>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="blog-item">
                        <div className="row align-items-center">
                            <div className="col-lg-4 col-md-3 col-sm-4">
                                <div className="post-image">
                                    <a href=""><img src="" alt=""/></a>
                                </div>
                            </div>

                            <div className="col-lg-8 col-md-9 col-sm-8">
                                <div className="post-content">
                                    <ul className="post-meta">
                                        <li><i className="icofont-tags"></i> <a href="">
                                            {/* {{data_get($news,"3.suptitle")}} */}
                                            </a></li>
                                        <li><i className="icofont-calendar"></i>
                                        {/* {{data_get($news,"3.date")}} */}
                                        </li>
                                    </ul>

                                    <h3><a href="">
                                        {/* {{data_get($news,"3.title")}} */}
                                        </a></h3>
                                    <p>
                                        {/* {{data_get($news,"3.lead")}} */}
                                        </p>
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

export default News