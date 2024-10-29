// import React from 'react'

import { useState } from "react";
import Header from "../components/Admin/Header";
// import Home from "../components/Admin/Home";
import Sidebar from "../components/Admin/Sidebar";
import Button from "../components/Admin/Product";
import "./Product.css";

function Product() {
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
      <Button />
    </div>
  );
}

export default Product;
