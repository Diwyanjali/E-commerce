// import React from 'react'

import {
  BsFillArchiveFill,
  // BsFillBellFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const [product, setProduct] = useState(0);
  const [membership, setMembership] = useState(0);
  const [customer, setCustomer] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/count_product")
      .then((response) => {
        setProduct(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching  count:", error);
      });

    axios
      .get("http://localhost:3000/count_membership")
      .then((response) => {
        setMembership(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching  count:", error);
      });

    axios
      .get("http://localhost:3000/count_customer")
      .then((response) => {
        setCustomer(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching  count:", error);
      });
  }, []);

  const handleProductClick = () => {
    navigate("/product"); // Navigate to the products page
  };

  const handleMembershipClick = () => {
    navigate("/category"); // Navigate to the membership page
  };

  const handleCustomerClick = () => {
    navigate("/customer"); // Navigate to the customers page
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3 className="bg-text">DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="taild-card" onClick={handleProductClick}>
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{product}</h1>
        </div>
        <div className="taild-card" onClick={handleMembershipClick}>
          <div className="card-inner">
            <h3>Membership</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{membership}</h1>
        </div>
        <div className="taild-card" onClick={handleCustomerClick}>
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{customer}</h1>
        </div>
        {/* <div className="taild-card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div> */}
      </div>
    </main>
  );
}

export default Home;
