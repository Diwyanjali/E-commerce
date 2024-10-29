// import React from 'react'

import { useState } from "react";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";
import News from "../components/Admin/News";
import "./Product.css";

function NewsPage() {
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

      <News />
    </div>
  );
}

export default NewsPage;
