import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/customer")
      .then((res) => setCustomer(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    if (searchTerm === "") {
      return customer;
    }
    return customer.filter(
      (item) =>
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/customer/${id}`);
      setCustomer(customer.filter((customer) => customer.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/customer/status/${id}`, {
        status: newStatus,
      });
      setCustomer(
        customer.map((cust) =>
          cust.id === id ? { ...cust, status: newStatus } : cust
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const filteredCustomers = handleSearch();

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <Link to="/createcustomer" className="btn btn-primary">
          Add Customer
        </Link>
        <div className="input-group w-100 w-md-50">
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-outline-warning my-2 my-sm-0"
            type="submit"
            id="search-addon"
          >
            Search
          </button>
        </div>
      </div>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Membership type</th>
            <th>Freezed balance</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((data, index) => (
            <tr key={index + 1}>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {index + 1}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {data.name}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {data.email}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {data.mobile}
              </td>
              <td
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  width: "120px",
                }}
              >
                {data.m_title || "-"}
              </td>
              <td
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  width: "70px",
                }}
              >
                {data.freeze_balance}
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <Link
                  to={`/customer_update/${data.id}`}
                  className="btn btn-warning me-3"
                >
                  Edit
                </Link>
                <Button variant="danger" onClick={() => handleDelete(data.id)}>
                  Delete
                </Button>
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={data.status === "active"}
                    onChange={() =>
                      handleStatusChange(
                        data.id,
                        data.status === "active" ? "block" : "active"
                      )
                    }
                  />{" "}
                  Active
                </label>
                <label className="ms-2">
                  <input
                    type="checkbox"
                    checked={data.status === "block"}
                    onChange={() =>
                      handleStatusChange(
                        data.id,
                        data.status === "block" ? "active" : "block"
                      )
                    }
                  />{" "}
                  Block
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Customer;
