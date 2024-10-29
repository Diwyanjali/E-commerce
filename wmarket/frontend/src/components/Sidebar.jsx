/* eslint-disable-next-line no-unused-vars */
import React from "react";
import { Link } from 'react-router-dom';
import "./Sidebar.css";
import {
  FaUser,
  FaMoneyBillWave,
  FaHistory,
  FaUsers,
  FaUserPlus,
  FaCreditCard,
  FaShieldAlt,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-item my-account">
        <FaUser />
        <span>My Account</span>
      </div>
      <div className="sidebar-item">
        <FaMoneyBillWave />
        <span>Recharge</span>
      </div>
      <div className="sidebar-item">
      <Link className="link" to={"/Withdrawalhistory"}>
        <FaMoneyBillWave />
        <span>Withdrawal</span>
        </Link>
      </div>
      <div className="sidebar-item">
        <FaHistory />
        <span>Recharge record</span>
      </div>
      <div className="sidebar-item">
        <FaUsers />
        <span>My team</span>
      </div>
      <div className="sidebar-item">
        <FaUserPlus />
        <span>Invite Friends</span>
      </div>
      <div className="sidebar-item">
        <FaCreditCard />
        <span>Withdrawal bank card</span>
      </div>
      <div className="sidebar-item">
        <FaShieldAlt />
        <span>Security Center</span>
      </div>
      <div className="sidebar-item">
        <FaCog />
        <span>Set up</span>
      </div>
    </div>
  );
}

export default Sidebar;
