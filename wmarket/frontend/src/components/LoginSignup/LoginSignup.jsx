// import React from "react";
import { FaUser } from "react-icons/fa";
import { MdCall, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const LoginSignup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "visitor",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // Validation logic
  const validate = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name) {
      errors.name = "Name is required";
    }

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!data.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (data.mobile.length !== 10) {
      errors.mobile = "Mobile number must be 10 digits long";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post("http://localhost:3000/signup", data, { withCredentials: true })
      .then((res) => {
        if (res.data.status === "200OK") {
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "You are now registered",
            confirmButtonText: "OK",
          });
          navigate("/login");
        } else if (res.data.status === "error") {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: res.data.message,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" containerr">
      <div className="headerr">
        <div className="text">
          Sign Up
          <div className="underline"></div>
        </div>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <FaUser size={20} className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
        </div>

        <div className="inputs">
          <div className="input">
            <MdEmail size={20} className="input-icon" />

            <input
              type="email"
              placeholder="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>

        <div className="inputs">
          <div className="input">
            <RiLockPasswordFill size={20} className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <MdCall size={20} className="input-icon" />
            <input
              type="number"
              placeholder="enter whatsapp number"
              onChange={(e) => setData({ ...data, mobile: e.target.value })}
              required
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}
          </div>
        </div>

        <select
          style={{ display: "none" }}
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="visitor">visitor</option>
        </select>

        <div className="forgot-password">
          Forgot Password?{" "}
          <span onClick={() => navigate("/forgotpass")}>Click here!</span>
        </div>
        <div className="submit-container">
          <button
            type="submit"
            onClick={() => navigate("/login")}
            className="submit"
          >
            Login
          </button>
          <button type="submit" className="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
