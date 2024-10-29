import React from "react";
import "./Elect.css";

function ElectCard(props) {
  return (
    <div className="card">
      <div className="card-body">
        <img src={props.images} className="elect-card-img mb-3" alt="..." />
      </div>
    </div>
  );
}

export default ElectCard;
