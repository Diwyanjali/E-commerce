/* eslint-disable-next-line no-unused-vars */
import React from "react";
import { NavLink } from "react-router-dom";
import "./NavEarn.css";

function NavEarn({ userId }) {
  return (
    <div className="navbarr">
      <NavLink to={"/earn"} className="nav-item-container">
        <i className="icon">📄</i>
        <span>Membership</span>
      </NavLink>
      <NavLink to={`/record?userId=${userId}`} className="nav-item-container">
        <i className="icon">📜</i>
        <span>Record</span>
      </NavLink>
      <NavLink to={`/order?userId=${userId}`} className="nav-item-container">
        <i className="icon">📦</i>
        <span>Orders</span>
      </NavLink>
      <NavLink to={"/help"} className="nav-item-container">
        <i className="icon">❓</i>
        Help
      </NavLink>
    </div>
  );
}

export default NavEarn;
