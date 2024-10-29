// import React from 'react'

import { useState } from "react";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";
import "./Product.css";
import UpdateMembership from "./UpdateMembership";

function UpdateMembershipPage() {
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

      <UpdateMembership />
    </div>
  );
}

export default UpdateMembershipPage;
