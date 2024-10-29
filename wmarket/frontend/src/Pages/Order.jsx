import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NavEarn from "../components/NavEarn";
import Footer from "../components/Footer";
import LogoComponent from "../components/LogoComponent";
import DashboardCard from "../components/DashboardCard";
import ImmediateOrder from "../components/ImmediateOrder";
import Logo from "../assests/logo.png";
import axios from "axios";

function Order() {
  const [customerId, setCustomerId] = useState("");
  const [customerStatus, setCustomerStatus] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [disableOrderButton, setDisableOrderButton] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/userinfo", { withCredentials: true })
      .then((res) => {
        setCustomerId(res.data.id);
        setMembershipId(res.data.m_id);
        setCustomerStatus(res.data.state);
        setCustomerName(res.data.name);
      })
      .catch((err) => {
        console.error("Failed to fetch user info", err);
      });
  }, []);

  return (
    <div>
      <Header />
      <NavEarn userId={customerId} />

      <div className="row justify-content-md-center d-flex align-items-center">
        <LogoComponent imageUrl={Logo} />
      </div>
      <div className="row justify-content-md-center">
        <ImmediateOrder
          m_id={membershipId}
          u_id={customerId}
          disableOrderButton={disableOrderButton}
          status={customerStatus}
          name={customerName}
        />
      </div>
      <div className="row justify-content-md-center d-flex align-items-center">
        <DashboardCard setDisableOrderButton={setDisableOrderButton} />
      </div>

      <h4 className="text-center mt-5">Operating steps:</h4>
      <h5 className="text-center">
        1. Click on the "Immedeate order grabbing" button to complete the task
        according to the prompts.
      </h5>
      <h5 className="text-center mb-5">
        2. After completing the task, the commission can be settled to the
        balance.
      </h5>

      <Footer />
    </div>
  );
}

export default Order;
