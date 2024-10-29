/* eslint-disable react/prop-types */
/* eslint-disable-next-line no-unused-vars */
import React from "react";
import "../components/Testimonial.css";

const TestimonialBox = (props) => {
  return (
    <div className="testimonial-box rounded align-content-center ">
      <div className="d-flex justify-content-center">
        <img className="testimonial-image" src={props.imageUrl} />
      </div>
      <div className="testimonial-client text-center ">{props.client}</div>
      <div className="testimonial-Country text-center">{props.Country}</div>
      <div className="testimonial-text text-center">{props.text}</div>
    </div>
  );
};

export default TestimonialBox;
