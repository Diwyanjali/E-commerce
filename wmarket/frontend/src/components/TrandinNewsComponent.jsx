/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import "./TrandingNews.css";
import axios from "axios";

const TrandinNewsComponent = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/fetch_tranding")
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
    <div className="trand-news-list">
      <h1>TRENDING News</h1>
      {news.map((newsItem, index) => (
        <div key={index}>
          <div className="trand-news-item">
            <span className="trad-news-number">{index + 1}</span>
            <div className="trand-news-content">
              <h2>{newsItem.title}</h2>
            </div>
            <img
              src={`http://localhost:3000/uploads/${newsItem.image}`}
              alt={newsItem.title}
              className="trand-news-image"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrandinNewsComponent;
