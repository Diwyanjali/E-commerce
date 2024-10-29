/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import './Brand.css';

const Brand = (props) => {
  return (
      <div className="cart">
        <img src={props.imageUrl} className="card-img" alt="..." />
      </div>
  );
};

export default Brand;
