// import React from 'react'

import { useState } from "react";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";
// import News from "../components/Admin/News";
import "./Product.css";
import CreateProduct from "./CreateProduct";

function ProductPage() {
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
      <CreateProduct />
    </div>
  );
}

export default ProductPage;
