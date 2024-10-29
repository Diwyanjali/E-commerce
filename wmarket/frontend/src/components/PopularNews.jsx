/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import "./PopularNews.css";
import axios from "axios";

const PopularNews = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/fetch_popular")
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
    <div className="popular-news-list">
      <h1>POPULAR NEWS</h1>
      {news.map((newsItem, index) => (
        <div key={index}>
          <div className="popular-news-item">
            <span className="popular-news-number">{index + 1}</span>
            <div className="popular-news-content">
              <h2>{newsItem.title}</h2>
            </div>

            <img
              src={`http://localhost:3000/uploads/${newsItem.image}`}
              alt={newsItem.title}
              className="popular-news-image"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularNews;
