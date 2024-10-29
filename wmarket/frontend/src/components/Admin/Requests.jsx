import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    axios
      .get("http://localhost:3000/membershipRequests")
      .then((res) => setRequests(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = (user_id, m_id) => {
    axios
      .put(`http://localhost:3000/update_mRequest/${user_id}/${m_id}`, {
        status: "accepted",
      })
      .then((res) => {
        console.log(res.data.message);
        fetchRequests();
      })
      .catch((err) => console.log(err));
  };

  const handleReject = (user_id, m_id) => {
    axios
      .put(`http://localhost:3000/update_mRequest/${user_id}/${m_id}`, {
        status: "rejected",
      })
      .then((res) => {
        console.log(res.data.message);
        fetchRequests();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h1>Membership Requests</h1>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Membership</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((data, i) => (
            <tr key={i}>
              <td>{data.id}</td>
              <td>{data.username}</td>
              <td>{data.m_title}</td>
              <td>{data.phone}</td>
              <td>
                <div>
                  <Button
                    variant="success"
                    style={{ marginRight: "8px" }}
                    onClick={() => handleAccept(data.user_id, data.m_id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(data.user_id, data.m_id)}
                  >
                    Reject
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Requests;
