import React, { useEffect, useState } from "react";
import StatusButton from "../components/StatusButton";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavEarn from "../components/NavEarn";
import Footer from "../components/Footer";
import axios from "axios";

import "./paid.css";

function Paid() {
  const location = useLocation();
  const { product, order, u_id } = location.state || {};

  const [availableBalance, setAvailableBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalProfit = async () => {
      try {
        const { data: balanceResponse } = await axios.get(
          `http://localhost:3000/user/${u_id}`
        );
        setAvailableBalance(balanceResponse.total_profit);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchTotalProfit();
  }, [u_id]);

  const totalProfit = async (userId, profit) => {
    try {
      const response = await axios.post("http://localhost:3000/updateProfit", {
        userId,
        profit,
      });
      if (response.data.message !== "Total profit updated successfully") {
        console.error("Error updating profit:", response.data.message);
      }
    } catch (error) {
      console.error("There was an error updating the profit!", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/update_order_status/${orderId}`,
        { status }
      );
      if (response.data.message !== "Order status updated successfully") {
        console.error("Error updating order status:", response.data.message);
      }
    } catch (error) {
      console.error("There was an error updating the order status!", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await totalProfit(u_id, product.profit);
      await updateOrderStatus(order.id, "paid");
      navigate("/order");
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };

  return (
    <div>
      <Header />
      <NavEarn userId={u_id} />

      <div className="paid-container">
        <h2 className="topic">Payment Details</h2>

        <div className="product-payment-grid">
          <div className="product-image">
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={order.p_name}
            />
            <div className="payment-info">
              <strong>Order Number: {order.id}</strong>
              <p>
                <strong>Available balance:</strong>{" "}
                {availableBalance.toFixed(2)} USD
              </p>
            </div>
          </div>

          <div className="payment-info">
            <h2>Name: {order.p_name}</h2>
            <p>
              <strong>Description:</strong> {product.description}
            </p>

            <div className="order-details">
              <p>
                <strong>Total order amount:</strong> ${order.price}
              </p>
            </div>

            <div className="profit-details">
              <div className="profit-row">
                <span>Single Profit yield:</span>
                <span>{order.commission.toFixed(2)}</span>
              </div>
              <div className="profit-row">
                <span>Current balance:</span>
                <span>${availableBalance.toFixed(2)}</span>
              </div>
              <div className="profit-row">
                <span>Calculation formula:</span>
                <span>
                  {order.price} X {order.commission} ≈ {order.profit}
                </span>
              </div>
              <div className="profit-row">
                <span>Profit from this transaction:</span>
                <span>{order.profit}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="submit-button-container">
          <button onClick={handleSubmit} className="pay-button">
            Confirm Payment
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Paid;
