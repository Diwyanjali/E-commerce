// import React from 'react'

import { useState } from "react";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";
import "./Product.css";
import CreateCustomer from "./CreateCustomer";

function AddCustomer() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="grid-container">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Header OpenSidebar={OpenSidebar} />

      {/* <News /> */}
      <CreateCustomer />
    </div>
  );
}

export default AddCustomer;
