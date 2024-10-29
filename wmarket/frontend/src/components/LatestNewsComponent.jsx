import { useState, useEffect } from "react";
import axios from "axios";
import "./LatestNews.css";

import { LiaComments } from "react-icons/lia";
import { IoMdShareAlt } from "react-icons/io";

const LatestNewsComponent = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/fetch_news") 
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setNews(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, []);

  return (
    <div className="news-list">
      <h1>LATEST News</h1>
      {news.length > 0 ? (
        news.map((newsItem, index) => (
          <div key={index}>
            <div className="news-item">
              <div className="news-content">
                <h2>{newsItem.title}</h2>
                <p>{newsItem.description}</p>
                <span>{newsItem.date}</span>
                <span> | </span>
                <span>{newsItem.author}</span>
                <span> | </span>
                <span>
                  <LiaComments />
                  {newsItem.comments}
                </span>
                <span> | </span>
                <span>
                  <IoMdShareAlt /> {newsItem.shares}
                </span>
              </div>

              <img
                src={`http://localhost:3000/uploads/${newsItem.image}`}
                alt={newsItem.title}
                // style={{ width: "100px", height: "auto" }}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
};

export default LatestNewsComponent;
