/* eslint-disable-next-line no-unused-vars */
import React from "react";
import "./ProductCard.css";
import watch1 from "../assests/watch1.jpg";

const ProductCard = () => {
  const ProductItems = [
    {
      id: 1,
      name: "Wahoo ELEMNT RIVAL Multisport GPS Watch - Stealth Gray",
      image: watch1,
      rating: 4.5,
      reviews: 5,
      price: 99.99,
      totalOrderAmount: 99.99,
      commission: 2,
    },
    {
      id: 2,
      name: "Wahoo ELEMNT RIVAL Multisport GPS Watch - Black",
      image: watch1,
      rating: 4,
      reviews: 8,
      price: 89.99,
      totalOrderAmount: 89.99,
      commission: 2,
    },
  ];
  return (
    <div className="product-list ">
      {ProductItems.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-details">
            <h2>{product.name}</h2>
            <div className="rating">
              <span>
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </span>
              <span>({product.reviews})</span>
            </div>
            <div className="price">${product.price.toFixed(2)}</div>
            <div className="order-details">
              <div>
                Total order amount: ${product.totalOrderAmount.toFixed(2)}
              </div>
              <div className="d-flex justify-content-end">
                Commission: ${product.commission.toFixed(2)}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button className="order-button">Place Order</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
