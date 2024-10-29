/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HeroSection from "./components/HeroSection";
import Card from "./components/Card";
import CanadaFlag from "./assests/canada.png";
import UsaFlag from "./assests/usa.png";
import NzFlag from "./assests/nz.png";
import Services from "./components/Services";
import TestimonialBox from "./components/TestimonialBox";
import Profile from "./assests/profile.png";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <>
        <Header />
        {/* <Header01 /> */}
        <HeroSection />

        <div className="d-flex justify-content-center my-5">
          <h1 className="">Countries of Service</h1>
        </div>
        <div className="d-flex justify-content-center gap-lg-5 mb-5  ">
          <Card
            imageUrl={CanadaFlag}
            title="Canada"
            text="Nestled in North America, Canada stands as a beacon of academic excellence, cultural diversity, and..."
          />
          <Card
            imageUrl={UsaFlag}
            title="United States"
            text="Nestled in the heart of Europe, the United Kingdom (UK) boasts a rich cultural heritage..."
          />
          <Card
            imageUrl={NzFlag}
            title="New Zealand"
            text="Nestled in the southwestern Pacific Ocean, New Zealand is renowned for its stunning natural landscapes..."
          />
        </div>
        <Services />
        <div className="d-flex justify-content-center gap-5 my-5 container">
          <TestimonialBox
            imageUrl={Profile}
            client="Sitha Senavirathne"
            Country="UK Visa"
            text="My dream of flying to the UK came true through SMS overseas education. I'm really lucky to get my hands near the right people, their work is fast and very smooth."
          />
          <TestimonialBox
            imageUrl={Profile}
            client="Adithya Rathnayake"
            Country="Canada Visa"
            text="I got my student visa to Canada successfully through SMS overseas education. I am genuinely very happy with the entire team's support and service Mr. Naz guided me transparently through the entire process."
          />
          <TestimonialBox
            imageUrl={Profile}
            client="Shafraz & Family"
            Country="Canada Student Visa + Work Permit"
            text="We got our student visa to Canada along with an open work permit & study permit, all thanks to Mr. Naz & his team"
          />
        </div>

        <Footer />
      </>
    </div>
  );
}

export default App;
