import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pending = () => {
  const [customerId, setCustomerId] = useState("");
  const [pendingOrders, setPendingOrders] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/userinfo", { withCredentials: true })
      .then((res) => {
        setCustomerId(res.data.id);
      })
      .catch((err) => {
        console.error("Failed to fetch user info", err);
      });
  }, []);

  useEffect(() => {
    if (customerId) {
      fetchPendingOrders(customerId);
    }
  }, [customerId]);

  const fetchPendingOrders = async (u_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/pending_orders/${u_id}`
      );
      setPendingOrders(response.data.pendingOrders);
    } catch (error) {
      setError("Error fetching pending orders");
      console.error("Error fetching pending orders:", error);
    }
  };

  const handlePlaceOrder = (order) => {
    navigate("/paid", {
      state: { product: order, order: order, u_id: customerId },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        marginBottom: "80px",
      }}
    >
      <div style={{ width: "90%", maxWidth: "1200px" }}>
        <h1 style={{ textAlign: "left" }}>Pending Orders</h1>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {pendingOrders.length ? (
          <table
            className="table table-striped"
            style={{ width: "100%", textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>Product</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Profit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <img
                      src={`http://localhost:3000/uploads/${order.image}`}
                      alt={order.p_name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td>{order.p_name}</td>
                  <td>{order.price}</td>
                  <td>{order.profit}</td>
                  <td>
                    <button
                      onClick={() => handlePlaceOrder(order)}
                      style={{
                        backgroundColor: " #0044cc",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                        height: "40px",
                        width: "120px",
                      }}
                    >
                      Place order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No pending orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Pending;
