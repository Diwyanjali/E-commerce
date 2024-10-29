import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NavEarn from "../components/NavEarn";
import Footer from "../components/Footer";
import StatusButton from "../components/StatusButton";
import Pending from "./Pending";
import Settled from "./Settled";
import axios from "axios";

function Recorde() {
  const [customerId, setCustomerId] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Header />
      <NavEarn userId={customerId} />
      <StatusButton onTabClick={handleTabClick} />{" "}
      {activeTab === "pending" && <Pending userId={customerId} />}
      {activeTab === "settled" && <Settled userId={customerId} />}
      <Footer />
    </div>
  );
}

export default Recorde;

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Header from "../components/Header";
// import NavEarn from "../components/NavEarn";
// import Footer from "../components/Footer";
// import StatusButton from "../components/StatusButton";
// import axios from "axios";

// function Recorde() {
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
//     <div>
//       <Header />
//       <NavEarn userId={customerId} />
//       <StatusButton userId={customerId} />
//       <Footer />
//     </div>
//   );
// }

// export default Recorde;
