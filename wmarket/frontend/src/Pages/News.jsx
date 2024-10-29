/* eslint-disable-next-line no-unused-vars */
import React from "react";
import Header from "../components/Header";
import LatestNewsComponent from "../components/LatestNewsComponent";
import Footer from "../components/Footer";
import TrandinNewsComponent from "../components/TrandinNewsComponent";
import PopularNews from "../components/PopularNews";
const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  
  justifyContent: "space-between",
};
function News() {
  return (
    <div>
      <Header />
      {/* <LatestNewsComponent /> */}
      <div className="row" style={row}>
        <LatestNewsComponent />
        <div className="side-column">
          <TrandinNewsComponent />
          <div>
            <PopularNews />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default News;
