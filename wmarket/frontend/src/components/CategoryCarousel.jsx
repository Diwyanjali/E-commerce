/* eslint-disable-next-line no-unused-vars */
import React from "react";
import "./CategoryCarousel.css";
import image5 from "../assests/image5.png";
import image6 from "../assests/image6.png";
import image7 from "../assests/image7.png";
import image8 from "../assests/image8.png";
import image9 from "../assests/image9.png";
import image10 from "../assests/image10.png";
import image11 from "../assests/image11.png";

const CategoryCarousel = () => {
  const carouselItems = [
    {
      title: "Craft Kits",
      image: image5,
    },
    {
      title: "Throw Pillows",
      image: image6,
    },
    {
      title: "Natural Glass",
      image: image7,
    },
    {
      title: "Self care ",
      image: image8,
    },
    {
      title: "Gift Ideas",
      image: image9,
    },
    {
      title: "Wall Decor",
      image: image10,
     
    },
    {
      title: "Wedding",
      image: image11,
    },
  ];

  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {[0, 1].map((item, idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
          >
            <div className="cards-wrapper row">
              {carouselItems.map((item, index) => (
                <div key={index} className="col-md-2">
                  <div className="card custom-card">
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt={item.title}
                    />
                    <div className="card-body">
                      <h2 className="card-title">{item.title}</h2>
                    
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CategoryCarousel;
