/* eslint-disable-next-line no-unused-vars */
import React from "react";
import "./Logo.css";

const LogoComponent = (props) => {
  return (
    <div className="logo">
      <img src={props.imageUrl} className="logoimg" alt="..." />
    </div>
  );
};

export default LogoComponent;
