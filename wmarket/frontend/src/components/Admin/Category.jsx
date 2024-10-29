import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Category = () => {
  const [membership, setMembership] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/fetch_memberships")
      .then((res) => setMembership(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (m_id) => {
    try {
      await axios.delete(`http://localhost:3000/category/${m_id}`);
      setMembership(
        membership.filter((membership) => membership.m_id !== m_id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/membership_create" className="btn btn-primary">
        Add Membership
      </Link>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Balance</th>
            <th>Commission Per Order</th>
            <th>Daily Order</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {membership.map((data, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              {/* <td>{data.m_id}</td> */}
              <td>{data.title}</td>
              <td>{data.balance}</td>
              <td>{data.commission}</td>
              <td>{data.orde}</td>
              <td>
                <img
                  src={`http://localhost:3000/uploads/${data.image}`}
                  alt={data.title}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>
                <Link
                  to={`/membership_update/${data.m_id}`}
                  className="btn btn-warning me-3"
                >
                  Edit
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(data.m_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Category;
