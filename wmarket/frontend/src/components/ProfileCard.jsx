/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

function ProfileCard() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/userinfo", { withCredentials: true })
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-picture">
        <FaUserCircle size={100} />
      </div>
      <div className="profile-info">
        <div className="profile-item">
          <span className="label">Customer ID : {userInfo.id}</span>
        </div>
        <div className="profile-item">
          <input
            type="text"
            placeholder="First Name"
            value={userInfo.name || ""}
            readOnly
          />
        </div>
        <div className="profile-item">
          <input
            type="email"
            placeholder="Email"
            value={userInfo.email || ""}
            readOnly
          />
        </div>
        {/* <div className="profile-item">
          <input type="date" placeholder="Date of Birth" />
          <input type="text" placeholder="NIC" />
        </div> */}
        <div className="profile-item">
          <input
            type="tel"
            placeholder="Contact Number"
            value={userInfo.mobile || ""}
            readOnly
          />
        </div>

        {/* <div className="profile-item">
          <input type="text" placeholder="City" />
        </div>
        <div className="profile-item">
          <input type="password" placeholder="Password" />
        </div> */}
        {/* <div className="profile-item">
          <span className="forgot-password">Forget Password ?</span>
        </div> */}
        {/* <div className="profile-actions">
          <button className="edit-btn">Edit</button>
          <button className="save-btn">Save</button>
        </div> */}

        <div className="card-boddy">
          <div className="card-img">
            {/* <img
                src={`http://localhost:3000/uploads/${member.image}`}
                className="membership-card-img"
                alt="membership icon"
              /> */}
          </div>
          <div className="card-content">
            <h3>Welcome :07******56</h3>
            <p>Available balance: {userInfo.total_profit || 0} USD</p>
            <p>Freeze balance: {userInfo.freeze_balance || 0} USD</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
