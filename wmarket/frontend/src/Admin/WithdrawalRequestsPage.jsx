import { useState } from "react";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";
import "./Product.css"; // Ensure this is the correct CSS file for withdrawal requests
import WithdrawalRequests from "../components/Admin/WithdrawalRequests";

function WithdrawalRequestsPage() {
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

      <WithdrawalRequests />
    </div>
  );
}

export default WithdrawalRequestsPage;
