/* eslint-disable react/prop-types */
/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import './Card.css';



const Card = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <img src={props.imageUrl} className="card-img mb-3" alt="..." />
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.text}</p>
        <a href="#" className="card-link fw-bold">Read more</a>
      </div>
    </div>

  );
};

export default Card;