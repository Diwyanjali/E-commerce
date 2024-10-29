import { useState } from "react";

import Header from "../components/Admin/Header";
import Home from "../components/Admin/Home";
import Sidebar from "../components/Admin/Sidebar";
import "./Dashboard.css";

function Dashoard() {
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
      <Home />
    </div>
  );
}

export default Dashoard;
