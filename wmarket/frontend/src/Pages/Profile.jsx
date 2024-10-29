/* eslint-disable-next-line no-unused-vars */
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
const row = {
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
};
const Profile = () => {
  return (
    <>
      <Header />

      <div className="row" style={row}>
        <Sidebar />
        <ProfileCard />
      </div>
      {/* <div className="col"></div> */}
      <Footer />
    </>
  );
};

export default Profile;
