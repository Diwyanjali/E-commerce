/* eslint-disable-next-line no-unused-vars */
import React from "react";
import "./ChatCard.css";
import User1 from "../assests/user1.png";
import { LuSendHorizonal } from "react-icons/lu";

function ChatCard() {
  return (
    <div className="chat-container">
      <div className="msg-header">
        <div className="container1">
          <img src={User1} className="msgimg" />
          <div className="active ">
            <p>User name</p>
          </div>
        </div>
      </div>

      <div className="chat-page">
        <div className="msg-inbox">
          <div className="chats">
            <div className="msg-page">
              <div className="received-chats">
                <div className="received-chats-img">
                  <img src={User1} className="msgimg" />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p>
                      Hi !! This is message from Riya . Lorem ipsum, dolor sit
                      amet consectetur adipisicing elit. Non quas nemo eum,
                      earum sunt, nobis similique quisquam eveniet pariatur
                      commodi modi voluptatibus iusto omnis harum illum iste
                      distinctio expedita illo!
                    </p>
                    <span className="time">18:06 PM | July 24 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="outgoing-chats">
            <div className="outgoing-chats-img">
              <img src={User1} className="msgimg" />
            </div>
            <div className="outgoing-msg">
              <div className="outgoing-chats-msg">
                <p className="multi-msg">
                  Hi riya , Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Illo nobis deleniti earum magni recusandae assumenda.
                </p>
                <p className="multi-msg">
                  Lorem ipsum dolor sit amet consectetur.
                </p>

                <span className="time">18:30 PM | July 24 </span>
              </div>
            </div>
          </div>

          {/* <!--  Message bottom section starts --> */}
          <div className="msg-bottom">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Write message..."
              />
              <div className="input-group-append ">
                <span className="input-group-text send-icon ">
                  <LuSendHorizonal />
                </span>
              </div>
            </div>
          </div>

          {/* <!-- Message bottom section ends. --> */}
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
