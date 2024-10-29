/* eslint-disable-next-line no-unused-vars */
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import  WithdrawalRequestForm from "../components/withdrawal_requests"; // Update the import statement

const row = {
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
};

const WithdrawalPage = () => {
  return (
    <>
      <Header />
      <div className="row" style={row}>
        <Sidebar />
        < WithdrawalRequestForm/> {/* Replace ProfileCard with WithdrawalHistory */}
      </div>
      <Footer />
    </>
  );
};

export default WithdrawalPage;
