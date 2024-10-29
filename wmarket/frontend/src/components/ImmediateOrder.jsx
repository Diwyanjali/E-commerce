import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import "./ImmediateOrder.css";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const ImmediateOrder = ({ m_id, u_id, disableOrderButton, status, name }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [order, setOrder] = useState("");
  const [product, setProduct] = useState(null);
  const [pending, setPending] = useState(false);
  const [customerServiceNumber, setCustomerServiceNumber] = useState("");

  const navigate = useNavigate();

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
    const message = `Hello, I need assistance with my order. My name is ${name} and my user ID is ${u_id}. I grabbed a lucky product and I would like to know more.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${customerServiceNumber}?text=${encodedMessage}`;

    console.log("Directing to WhatsApp");
    window.open(whatsappUrl, "_blank");
  };

  const handleClick = async () => {
    if (!disableOrderButton) {
      setShowModal(true);
      setCountdown(0);
      await pendingCheck();
    }
  };

  const pendingCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pending/${u_id}`);
      const { hasPendingOrders } = response.data;

      if (hasPendingOrders === true) {
        setPending(true);
      }
    } catch (error) {
      console.error("There was an error checking the order status!", error);
    }
  };

  const grabOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/grab_order/${u_id}/${m_id}`
      );
      const { message, order } = response.data;

      if (message === "Order created successfully") {
        setOrder(order);
        await fetchProduct(order.p_id);
        setShowModal(false);

        if (order.lucky === "yes") {
          customerStatusChange(u_id);
          await Swal.fire({
            icon: "success",
            title: "Contragulation !",
            text: "You have grabed a lucky product.",
            confirmButtonText: "OK",
          });
          setShowSuccessModal(true);
        } else {
          setShowSuccessModal(true);
        }
      } else {
        setShowModal(false);
        setCountdown(0);
        alert("Error grabbing order.");
      }
    } catch (error) {
      console.error("There was an error grabbing the order!", error);
    }
  };

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/product/${productId}`
      );
      const productData = response.data;
      setProduct(productData);
    } catch (error) {
      console.error("There was an error fetching the product details!", error);
    }
  };

  const updateOrderStatus = async (status) => {
    try {
      await axios.put(`http://localhost:3000/update_order_status/${order.id}`, {
        status,
      });
    } catch (error) {
      console.error("There was an error updating the order status!", error);
    }
  };

  const handleLaterClick = async () => {
    await updateOrderStatus("pending");
    setShowSuccessModal(false);
    navigate("/record");
  };

  const handlePlaceOrderClick = async () => {
    await updateOrderStatus("pending");
    navigate("/record");
  };

  useEffect(() => {
    const attemptOrder = async () => {
      if (countdown === 100 && !pending) {
        await grabOrder();
      } else if (countdown === 100 && pending) {
        setShowModal(false);
        await Swal.fire({
          icon: "error",
          title: "You have a pending order.",
          text: "You cannot buy again until complete for the pending order.",
          confirmButtonText: "OK",
        });
        navigate(`/record`);
      }
    };

    attemptOrder();
  }, [countdown, pending, u_id, navigate]);

  useEffect(() => {
    let timer;
    if (showModal && countdown < 100) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown + 1);
      }, 100);
    } else if (countdown >= 100) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [showModal, countdown]);

  const customerStatusChange = async (userId) => {
    try {
      await axios.put(`http://localhost:3000/customer/status/${userId}`, {
        status: `block`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="immediateOrder">
      {status !== "active" ? (
        <div>
          <div className="notice">
            You have grabbed a lucky product and earned a chance for early
            withdrawal.
          </div>
          <button
            className="immediateOrderBtn"
            onClick={handleContactCustomerService}
          >
            Contact customer service.
          </button>
        </div>
      ) : disableOrderButton ? (
        <div className="notice">All daily tasks are completed</div>
      ) : (
        <button
          className="immediateOrderBtn"
          onClick={handleClick}
          disabled={disableOrderButton}
        >
          Immediate order grabbing
        </button>
      )}

      {/* Order Grabbing Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Order Grabbing"
        className="popup"
        overlayClassName="popup-overlay"
      >
        <div className="popup-content">
          <h2>We're grabbing orders...</h2>
          <div className="progress-circle">
            <span>{countdown}%</span>
            <svg>
              <circle cx="40" cy="40" r="40"></circle>
              <circle
                cx="40"
                cy="40"
                r="40"
                style={{
                  strokeDashoffset: 251 - (251 * countdown) / 100,
                }}
              ></circle>
            </svg>
          </div>
          <p>
            Due to the high number of users vying for orders at the current
            level, the system is working hard to dispatch orders. Please be
            patient and wait.
          </p>
          <p>
            Kind reminder: Upgrading VIP level can help you obtain orders faster
          </p>
          <button className="cancelButton" onClick={() => setShowModal(false)}>
            Cancel queuing
          </button>
        </div>
      </Modal>

      {/* Order Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        contentLabel="Order Success"
        className="popup"
        overlayClassName="popup-overlay"
        shouldCloseOnOverlayClick={false}
      >
        <div className="popup-content">
          <h2>Successfully snatched the order!</h2>
          {product && (
            <div className="order-details">
              <img
                src={`http://localhost:3000/uploads/${product.image}`}
                alt={order.p_name}
              />
              <div className="order-info">
                <h1>Product: {order.p_name}</h1>
                <p className="order-price">Price: ${order.price}</p>
                <p className="order-quantity">Profit: ${order.profit}</p>
                {order.lucky === "yes" && (
                  <p className="lucky-product-message">
                    This is a lucky product!
                  </p>
                )}
              </div>
            </div>
          )}
          <p>Order number: {order.id}</p>
          <div className="action-buttons">
            <button onClick={handleLaterClick}>Later</button>
            <button onClick={handlePlaceOrderClick}>
              Go to place an order
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImmediateOrder;
