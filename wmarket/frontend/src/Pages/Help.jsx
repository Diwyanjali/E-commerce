/* eslint-disable-next-line no-unused-vars */
import React from "react";
import Header from "../components/Header";
import NavEarn from "../components/NavEarn";
import ServiceCard from "../components/ServiceCard";
import ChatCard from "../components/ChatCard";
import Footer from "../components/Footer";

function Help() {
  return (
    <div>
      <Header />
      <NavEarn />
     
      <div className="row">
        <div className="col-12 col-md-7">
          <ServiceCard />
        </div>
        <div className="col-5 col-md-5">
          <ChatCard />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Help;
