import PropTypes from "prop-types"; // Import PropTypes
import {
  BsFillBellFill,
  BsJustify,
  BsPersonCircle,
  BsSearch,
} from "react-icons/bs";
import "./Header.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ OpenSidebar }) => {
  const [name, setName] = useState("");
  const [pendingCount, setPendingCount] = useState({
    withdrawal: 0,
    membership: 0,
  });
  /* eslint-disable-next-line no-unused-vars */
  const [newRequest, setNewRequest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/userinfo", { withCredentials: true })
      .then((res) => {
        if (res.data.status === "200OK") {
          setName(res.data.name);
        }
      })
      .catch((err) => console.log(err));
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchPendingCount = () => {
    axios
      .get("http://localhost:3000/withdrawal_requests/count")
      .then((res) => {
        const withdrawalCount = res.data.count;
        if (withdrawalCount > pendingCount.withdrawal) {
          setNewRequest(true);
        }
        setPendingCount((prevState) => ({
          ...prevState,
          withdrawal: withdrawalCount,
        }));
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/membership_requests/count")
      .then((res) => {
        const membershipCount = res.data.count;
        if (membershipCount > pendingCount.membership) {
          setNewRequest(true);
        }
        setPendingCount((prevState) => ({
          ...prevState,
          membership: membershipCount,
        }));
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.status === "200OK") {
          navigate("/login");
        } else {
          alert("Error during logout");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>

      <div className="header-right">
        <div className="bell-icon">
          <BsFillBellFill
            className={`icon ${
              pendingCount.withdrawal > 0 || pendingCount.membership > 0
                ? "bell-icon-active"
                : ""
            }`}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          {/* Display both badges if counts are greater than 0 */}
          {pendingCount.withdrawal > 0 && (
            <span className="badge-danger">{pendingCount.withdrawal}</span>
          )}
          {pendingCount.membership > 0 && (
            <span className="badge-warning">{pendingCount.membership}</span>
          )}
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            style={{
              background: "transparent",
              border: "none",
              color: "black",
            }}
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a
                className="dropdown-item"
                onClick={() => navigate("/WithdrawalRequestsPage")}
              >
                Withdrawal Requests ({pendingCount.withdrawal})
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => navigate("/membership_request")}
              >
                Membership Requests ({pendingCount.membership})
              </a>
            </li>
          </ul>
        </div>

       
        <div className="dropdown">
          <BsPersonCircle className="icon" />
          <a
            className="btn btn-secondary dropdown-toggle"
            style={{
              background: "transparent",
              border: "none",
              color: "black",
            }}
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {name}
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

// Define prop types
Header.propTypes = {
  OpenSidebar: PropTypes.func.isRequired, // Validate that OpenSidebar is a function and required
};

export default Header;
