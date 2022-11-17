import useAxiosFunction from "../../axiosFetch/useAxiosFunction";
import axios from "../../apis/axiosBase";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const News = () => {
  const [posts, error, loading, axiosFetch] = useAxiosFunction();

  const getStatistics = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "get",
      url: "/news",
    });
  };

  useEffect(() => {
    getStatistics();

    // eslint-disable-next-line
  }, []);

  return (
    <section className="blog-area ptb-110" id="blog-section">
      <div className="container">
        <div className="section-title">
          <h2> آخرین اخبار اقتصادی</h2>
        </div>

        <div className="row">
          {!loading &&
            !error &&
            posts.data?.news.map((item, index) => (
              <div className="col-lg-6 col-md-12" key={index} style={{marginBottom:"20px"}}>
                <a href={item.url} target="_blank">
                  <div className="single-blog-post mb-0">

                      <div className="post-image"  style={{borderRadius:"10px 10px 0px 0px"}}>
                     
                        <img src={item.image} style={{borderRadius:"10px 10px 0px 0px"}} alt={`news ${index}`} />
     
                      </div>


                    <div className="post-content" style={{borderRadius:"0px 0px 10px 10px",backgroundColor:"#ececec"}}>
                      <ul className="post-meta">
                        <li>
                          <i className="icofont-tags"></i>{" "}
                          <p>{item.subtitle}</p>
                        </li>
                        <li>
                          <i className="icofont-calendar"></i>
                          {item.date}
                        </li>
                      </ul>

                      <h3 className="mb-0">
                        <a href={item.url} target="_blank">{item.title}</a>
                      </h3>
                      <p>{item.lead}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default News;
