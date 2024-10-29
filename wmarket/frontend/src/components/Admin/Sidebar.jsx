// import React from 'react'

import {
  BsCart3,
  BsFillArchiveFill,
  BsFillGearFill,
  BsFillGrid3X3GapFill,
  BsGrid1X2Fill,
  BsMenuButtonWideFill,
  BsPeopleFill,
} from "react-icons/bs";
import { IoGiftSharp } from "react-icons/io5";
import "./Header.css";
import { FaStarOfLife } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdCardMembership } from "react-icons/md";

/* eslint-disable-next-line react/prop-types */
function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> WMARKET
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <FaStarOfLife />
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link className="link" to={"/dashoard"}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link className="link" to={"/WithdrawalRequestsPage"}>
            <BsFillGrid3X3GapFill className="icon" /> Withdrawal Requests
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link className="link" to={"/product"}>
            <BsFillArchiveFill className="icon" /> Products
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link className="link" to={"/category"}>
            <BsFillGrid3X3GapFill className="icon" /> Membership
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link className="link" to={"/membership_request"}>
            <MdCardMembership className="icon" /> Requests
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link className="link" to={"/customer"}>
            <BsPeopleFill className="icon" /> Customers
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link className="link" to={"/lucky"}>
            <IoGiftSharp className="icon" /> Lucky Order
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link className="link" to={"/new"}>
            <BsMenuButtonWideFill className="icon" /> News
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link className="link" to={""}>
            <BsFillGearFill className="icon" /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
