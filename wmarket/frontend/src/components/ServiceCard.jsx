/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import "./ServiceCard.css";
import Custom from "../assests/custom.png";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";

const ServiceCard = (u_id) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [customerServiceNumber, setCustomerServiceNumber] = useState("");

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  useEffect(() => {
    const fetchAdminMobile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin-mobile");
        const { mobiles } = response.data;

        if (mobiles && mobiles.length > 0) {
          setCustomerServiceNumber(mobiles[0]);
        }
      } catch (error) {
        console.error(
          "There was an error fetching the admin mobile number!",
          error
        );
      }
    };

    fetchAdminMobile();
  }, []);

  const handleContactCustomerService = () => {
    const message = `Hello, I need assistance with my order. My name is ${name} and my user ID is ${u_id}. I would like to know more.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${customerServiceNumber}?text=${encodedMessage}`;

    console.log("Directing to WhatsApp");
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="faq-container">
      <h5 className="faq-title">
        if you have any questions or need help, please contact online customer
        service to resolve them for you.
      </h5>
      <div className="faq-header">
        <img src={Custom} alt="Customer Service" className="faq-image" />
        <h2>Zalando</h2>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item" onClick={() => handleToggle(0)}>
          <span>How to recharge and what are the payment methods?</span>
          <BsChevronDown
            className={`drop-icon ${activeIndex === 0 ? "rotate" : ""}`}
          />
          {activeIndex === 0 && (
            <div className="faq-answer">
              This system is open to multiple countries, and we provide
              international payment methods that support domestic currencies for
              different countries.
            </div>
          )}
        </li>
        <li className="list-group-item" onClick={() => handleToggle(1)}>
          <span>How can I work part-time and earn profits?</span>
          <BsChevronDown
            className={`drop-icon ${activeIndex === 1 ? "rotate" : ""}`}
          />
          {activeIndex === 1 && (
            <div className="faq-answer">
              You can grab orders in the system and earn stable automatic
              swiping profits and interest every day, all of which can be
              withdrawn to your bank card.
            </div>
          )}
        </li>
        <li className="list-group-item" onClick={() => handleToggle(2)}>
          <span>How to register as a member?</span>
          <BsChevronDown
            className={`drop-icon ${activeIndex === 2 ? "rotate" : ""}`}
          />
          {activeIndex === 2 && (
            <div className="faq-answer">
              Adopting an invitation system to register new members, in order to
              ensure the profits of registered members and prevent excessive
              registration from reducing profits, new members can only register
              under the invitation of existing members.
            </div>
          )}
        </li>
        <li className="list-group-item" onClick={() => handleToggle(3)}>
          <span>Is there a limit on the purchase amount?</span>
          <BsChevronDown
            className={`drop-icon ${activeIndex === 3 ? "rotate" : ""}`}
          />
          {activeIndex === 3 && (
            <div className="faq-answer">
              Yes, in order to provide more members with the opportunity to earn
              profits, each account in the system has a minimum purchase amount
              limit.
            </div>
          )}
        </li>
        <li className="list-group-item" onClick={() => handleToggle(4)}>
          <span>
            What should I do if I encounter problems during the operation?
          </span>
          <BsChevronDown
            className={`drop-icon ${activeIndex === 4 ? "rotate" : ""}`}
          />
          {activeIndex === 4 && (
            <div className="faq-answer">
              You can contact online customer service at any time to assist in
              completing all operations.
            </div>
          )}
        </li>
      </ul>
      <button className="contact-button" onClick={handleContactCustomerService}>
        Contact Customer Service
      </button>
    </div>
  );
};

export default ServiceCard;
