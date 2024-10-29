/* eslint-disable-next-line no-unused-vars */
import React, { useState } from "react";
import "./Product.css";
import product1 from "../assests/product1.png";
import product2 from "../assests/product2.png";

const Product = () => {
  const carouselItems = [
    {
      image: product1,
    },
    {
      image: product2,
    },
    {
      image: product1,
    },
    {
      image: product2,
    },
  ];

  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="container-fluid cards-wrapper">
            {carouselItems.map((item, index) => (
              <div key={index} className="col-md-2">
                <div className="cosmetics-card">
                  <img
                    src={item.image}
                    className="cosmetics-card img"
                    alt={`Product ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
export default Product;
