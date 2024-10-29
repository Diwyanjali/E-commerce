/* eslint-disable-next-line no-unused-vars */
import React from "react";
import "./StatusButton.css";

/* eslint-disable-next-line react/prop-types */
const StatusButton = ({ onTabClick }) => {
  return (
    <div className="status-buttons d-flex gap-2 col-6 mx-auto">
      <button
        type="button"
        className="btn-status btn-primary"
        onClick={() => onTabClick("pending")}
      >
        Pending
      </button>
      <button
        type="button"
        className="btn-status btn-primary"
        onClick={() => onTabClick("settled")}
      >
        Settled
      </button>
    </div>
  );
};
export default StatusButton;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./StatusButton.css";

// const StatusButton = ({ userId }) => {
//   const [customerId, setCustomerId] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/userinfo", { withCredentials: true })
//       .then((res) => {
//         setCustomerId(res.data.id);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch user info", err);
//       });
//   }, []);
//   return (
//     <div className="status-buttons d-flex gap-2 col-6 mx-auto">
//       <button type="button" className="btn-status btn-primary">
//         <Link
//           className="nav-link active fw-medium"
//           aria-current="page"
//           to={`/pending?userId=${customerId}`}
//         >
//           Pending
//         </Link>
//       </button>
//       <button type="button" className="btn-status btn-primary">
//         <Link
//           className="nav-link active fw-medium"
//           aria-current="page"
//           to={"/settled"}
//         >
//           Settled
//         </Link>
//       </button>
//     </div>
//   );
// };

// export default StatusButton;
