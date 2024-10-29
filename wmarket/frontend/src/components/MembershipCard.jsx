/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import "./MembershipCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* eslint-disable-next-line react/prop-types */
const MembershipCard = ({ m_id, userId }) => {
  const [membership, setMembership] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/fetch_memberships")
      .then((response) => response.json())
      .then((data) => setMembership(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleJoin = (member) => {
    navigate("/order", { state: { m_id: member.m_id, userId } });
  };

  const handleRequest = (member) => {
    axios
      .post("http://localhost:3000/add_membershipRequests", {
        user_id: userId,
        m_id: member.m_id,
      })
      .then((response) => {
        if (response.data.status === "200") {
          alert("Request submitted successfully");
        } else {
          alert("Error submitting request: " + response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error making request:", error);
        alert("Error submitting request. Please try again.");
      });
  };

  return (
    <div className="membership-card-container">
      {membership.map((member) => (
        <div className="card-bodyy" key={member.m_id}>
          <div className="card-img">
            <img
              src={`http://localhost:3000/uploads/${member.image}`}
              className="membership-card-img"
              alt="membership icon"
            />
          </div>
          <div className="card-content">
            <h3>{member.title}</h3>
            <p>Required balance: {member.balance} $</p>
            <p>Commission per order: {member.commission} %</p>
            <p>Daily order: {member.orde}</p>

            {m_id === member.m_id ? (
              <button
                className="join-button"
                onClick={() => handleJoin(member)}
              >
                Join&gt;&gt;
              </button>
            ) : (
              <button
                className="join-button"
                onClick={() => handleRequest(member)}
              >
                Request&gt;&gt;
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MembershipCard;
