import React, { useState, useEffect } from "react";
import axios from "axios";

const LuckyOrder = () => {
  const [smallestProductCount, setSmallestProductCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [luckyProducts, setLuckyProducts] = useState([]);

  useEffect(() => {
    const fetchSmallestProductCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/smallestProductCount"
        );
        setSmallestProductCount(response.data.smallestProductCount);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchSmallestProductCount();
  }, []);

  const fetchLuckyProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products/lucky");
      setLuckyProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch lucky products", error);
    }
  };

  const handleNumberChange = async (event) => {
    const selectedNumber = event.target.value;
    setSelectedNumber(selectedNumber);

    try {
      await axios.put(`http://localhost:3000/product/lucky/${selectedNumber}`);
      console.log(`Lucky products updated for number ${selectedNumber}.`);
      await fetchLuckyProducts();
    } catch (error) {
      console.error("Failed to update lucky products", error);
    }
  };

  useEffect(() => {
    fetchLuckyProducts();
  }, []);

  const currentDate = new Date().toISOString().slice(0, 10);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <table
        className="table table-striped"
        style={{
          width: "80%",
          margin: "0 auto",
          tableLayout: "fixed",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th style={{ height: "60px" }}>Current Date</th>
            <th style={{ height: "60px" }}>Luck Product Number</th>
            <th style={{ height: "60px" }}>Select a Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ height: "80px", textAlign: "center" }}>
              {currentDate}
            </td>
            <td style={{ height: "80px", textAlign: "center" }}>
              {selectedNumber || "No Selected"}
            </td>
            <td style={{ height: "80px", textAlign: "center" }}>
              <select
                value={selectedNumber}
                onChange={handleNumberChange}
                style={{ padding: "10px", width: "80%", textAlign: "center" }}
              >
                <option value="" disabled>
                  Select a Product
                </option>
                {[...Array(smallestProductCount).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    Product {num + 1}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      {luckyProducts.length > 0 && (
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
            Lucky Products
          </h2>
          <table
            className="table table-striped"
            style={{ width: "80%", margin: "0 auto" }}
          >
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Membership Type</th>
              </tr>
            </thead>
            <tbody>
              {luckyProducts.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.productname}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/uploads/${product.image}`}
                      alt={product.productname}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.membership_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LuckyOrder;
