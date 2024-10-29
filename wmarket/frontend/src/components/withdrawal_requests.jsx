// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import axios from "axios";

function WithdrawalRequestForm() {
  const [name, setName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [totalProfit, setTotalProfit] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);
  const [membershipProductCount, setMembershipProductCount] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch user information when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:3000/userinfo", { withCredentials: true })
      .then((res) => {
        setName(res.data.name); // Automatically set the user's name
        setCustomerId(res.data.id); // Automatically set the user's ID as customerId
        setTotalProfit(res.data.total_profit); // Set the user's total profit

        // Fetch Completed Task Count
        return axios.get(`http://localhost:3000/totalProfit/${res.data.id}`);
      })
      .then((profitResponse) => {
        setCompletedToday(profitResponse.data.totalPaidToday); // Completed task count

        // Fetch Membership Product Count
        return axios.get(
          `http://localhost:3000/getMembershipProductCount/${customerId}`
        );
      })
      .then((membershipResponse) => {
        setMembershipProductCount(membershipResponse.data.productCount); // Membership product count
      });
  }, [customerId]); // Trigger when customerId is updated

  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if membership product count equals completed task count
    if (completedToday !== membershipProductCount) {
      setResponseMessage(
        "You cannot request a withdrawal without completing today's order."
      );
      return;
    }

    // Check if the withdrawal amount is less than or equal to total profit
    if (parseFloat(amount) > parseFloat(totalProfit)) {
      setResponseMessage(
        "Insufficient funds. Withdrawal amount exceeds total profit."
      );
      return;
    }

    axios
      .post(
        "http://localhost:3000/withdrawal",
        { name, customerId, amount },
        { withCredentials: true }
      )
      .then(() => {
        setResponseMessage(
          "Success: Withdrawal request submitted successfully!"
        );
        setAmount(""); // Clear the amount field after submission
      })
      .catch((err) => {
        console.error(err.response || err); // Log full error
        setResponseMessage("Failed to submit withdrawal request.");
      });
  };
  return (
    <div className="withdrawal-container">
      <h2>Withdrawal Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="withdrawal-item">
          <input
            type="text"
            placeholder="Name"
            value={name}
            readOnly // Make this field read-only as it is auto-populated
            required
          />
        </div>
        <div className="withdrawal-item">
          <input
            type="text"
            placeholder="Customer ID"
            value={customerId}
            readOnly // Make this field read-only as it is auto-populated
            required
          />
        </div>
        <div className="withdrawal-item">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <div className="withdrawal-actions">
          <button type="submit" className="withdraw-btn">
            Request Withdrawal
          </button>
        </div>
        {responseMessage && (
          <p className="response-message">{responseMessage}</p>
        )}
      </form>
    </div>
  );
}

export default WithdrawalRequestForm;
