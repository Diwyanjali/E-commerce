// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa"; // Font Awesome icons
import "./ProfileCard.css";

function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user info first
    axios
      .get("http://localhost:3000/userinfo", { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data);
        // Once we have the user info, fetch their withdrawal history
        return axios.get(`http://localhost:3000/withdrawal_history?user_id=${res.data.id}`, { withCredentials: true });
      })
      .then((res) => setWithdrawals(res.data))
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch withdrawal history.");
      });
  }, []);

  // Function to render the status icon
  const renderStatusIcon = (status) => {
    const normalizedStatus = status.toLowerCase(); // Normalize to lowercase
    if (normalizedStatus === "accepted") {
      return <FaCheckCircle className="icon-accepted" />;
    } else if (normalizedStatus === "rejected") {
      return <FaTimesCircle className="icon-rejected" />;
    } else if (normalizedStatus === "pending") {
      return <FaClock className="icon-pending" />;
    } else {
      return null;
    }
  };
  

  return (
    <div className="history-container">
      <div className="header">
        <h3 className="history-heading">Withdrawal History</h3>
        <Link to="/withdrawal_requests">
          <button className="request-btn">Request Withdrawal</button>
        </Link>
      </div>
      {error && <p className="response-message">{error}</p>}
      <table className="history-table">
        <thead>
          <tr>
            <th>Request Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Processed Date</th>
            <th>Status Icon</th> {/* New column for the icons */}
          </tr>
        </thead>
        <tbody>
          {withdrawals.length > 0 ? (
            withdrawals.map((withdrawal) => (
              <tr key={withdrawal.request_id}>
                <td>{new Date(withdrawal.request_date).toLocaleDateString()}</td>
                <td>${withdrawal.amount.toFixed(2)}</td>
                <td>{withdrawal.status}</td>
                <td>{withdrawal.processed_date ? new Date(withdrawal.processed_date).toLocaleDateString() : "N/A"}</td>
                <td>{renderStatusIcon(withdrawal.status)}</td> {/* Render the icon based on status */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No withdrawal history available.</td> {/* Updated colspan to account for the new column */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WithdrawalHistory;
