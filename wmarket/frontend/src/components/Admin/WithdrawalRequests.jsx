import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const Withdrawalrequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/fetch_withdrawalrequests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Function to handle the accept action
  const handleAccept = (user_id, request_id, amount) => {
    if (window.confirm("Are you sure you want to accept this request?")) {
      axios
        .put(`http://localhost:3000/withdrawalrequests/${user_id}/${request_id}`, { status: "accepted", amount })
        .then((response) => {
          const { processedDate } = response.data;
          console.log(`Processed date received for request_id ${request_id}: ${processedDate}`);
          // Update the request status and processed date in the state
          setRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.request_id === request_id && request.user_id === user_id
                ? { ...request, status: "Accepted", processed_date: processedDate }
                : request
            )
          );
        })
        .catch((err) => console.log("Error in accepting request:", err));
    }
  };

  // Function to handle the reject action
  const handleReject = (user_id, request_id) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      axios
        .put(`http://localhost:3000/withdrawalrequests/${user_id}/${request_id}`, { status: "rejected" })
        .then((response) => {
          const { processedDate } = response.data;
          console.log(`Processed date received for request_id ${request_id}: ${processedDate}`);
          // Update the request status and processed date in the state
          setRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.request_id === request_id && request.user_id === user_id
                ? { ...request, status: "Rejected", processed_date: processedDate }
                : request
            )
          );
        })
        .catch((err) => console.log("Error in rejecting request:", err));
    }
  };

  return (
    <div className="container mt-4">
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Request Date</th>
            <th>Processed Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((data, index) => (
            <tr key={data.request_id}>
              <td>{index + 1}</td>
              <td>{data.user_id}</td>
              <td>{data.name}</td>
              <td>{data.amount}</td>
              <td>{data.status}</td>
              <td>{data.request_date}</td>
              <td>{data.processed_date || "N/A"}</td> {/* Display N/A if processed_date is null */}
              <td>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => handleAccept(data.user_id, data.request_id, data.amount)}
                >
                  Accept
                </Button>
                <Button variant="danger" onClick={() => handleReject(data.user_id, data.request_id)}>
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Withdrawalrequests;
