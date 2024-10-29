/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NavEarn from "../components/NavEarn";
import MembershipCard from "../components/MembershipCard";
import Footer from "../components/Footer";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [m_id, setM_id] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/userinfo", { withCredentials: true })
      .then((res) => {
        if (res.data.status === "200OK") {
          setName(res.data.name);
          setUserId(res.data.id);
          setM_id(res.data.m_id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <NavEarn userId={userId} />
      <div
        className="text-left m-4 ont-weight-bold"
        style={{ backgroundColor: "#CCD0D0", width: "200px" }}
      >
        <h5 className="text-Left">MEMBERSHIP LEVEL :</h5>
      </div>

      <div className="flex">
        <MembershipCard m_id={m_id} userId={userId} />
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
