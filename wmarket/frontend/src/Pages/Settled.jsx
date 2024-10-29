import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const Settled = () => {
  const [customerId, setCustomerId] = useState("");
  const [paidOrders, setPaidOrders] = useState([]);
  const [error, setError] = useState(null);

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
      fetchSettled(customerId);
    }
  }, [customerId]);

  const fetchSettled = async (u_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/paidOrders/${u_id}`
      );
      setPaidOrders(response.data.paidOrders);
    } catch (error) {
      setError("Error fetching paid orders");
      console.error("Error fetching paid orders:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "90%", maxWidth: "1200px" }}>
        <h1 style={{ textAlign: "left" }}>Settled Orders</h1>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {paidOrders.length ? (
          <table
            className="table table-striped"
            style={{ width: "100%", textAlign: "center" }}
          >
            <thead>
              <tr>
                {/* <th>Order ID</th> */}
                <th>Product</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Profit</th>
                <th>Date Paid</th>
              </tr>
            </thead>
            <tbody>
              {paidOrders.map((order) => (
                <tr key={order.id}>
                  {/* <td>{order.id}</td> */}
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
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No paid orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Settled;
