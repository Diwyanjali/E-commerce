/* eslint-disable react/prop-types */
// import React from 'react';

import bag from '../assests/bag1.png';
// import image5 from '../assests/image5.png';
import shoes from '../assests/shoes.png';
import bagg from '../assests/bagg.png';
import shoes2 from '../assests/shoes2.png';
import ring from '../assests/ring.png';
import bangal from '../assests/bangal.png';

const ShoppingCart = () => {
    const carouselItems = [
      {
        title: "Craft Kits",
        image: bag,
      },
      {
        title: "Throw Pillows",
        image: shoes,
      },
      {
        title: "Natural Glass",
        image: bagg,
      },
      {
        title: "Self care ",
        image: shoes2,
      },
      {
        title: "Gift Ideas",
        image: ring,
      },
      {
        title: "Wall Decor",
        image: bangal,
       
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
  
  
export default ShoppingCart;