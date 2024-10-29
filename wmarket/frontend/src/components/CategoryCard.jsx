/* eslint-disable react/prop-types */
/* eslint-disable-next-line no-unused-vars */
import React from "react";
import "./CategoryCard.css";

const CategoryCard = (props) => {
  return (
    <div className="card">
      <img src={props.imageUrl} className="card-img mb-3" alt={props.title} />
      <h3>{props.text}</h3>  
    </div>
  );
};



export default CategoryCard;
