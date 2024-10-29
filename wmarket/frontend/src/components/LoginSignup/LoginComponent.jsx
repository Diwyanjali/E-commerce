// import React from 'react'

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { useState } from "react";
import Swal from "sweetalert2";

const LoginComponent = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const validate = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      .post("http://localhost:3000/login", data, { withCredentials: true })
      .then((res) => {
        if (res.data.status === "200OK") {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You are now logged in",
            confirmButtonText: "OK",
          });
          localStorage.setItem("role", res.data.role);
          if (res.data.role === "admin") {
            navigate("/dashoard");
          } else {
            navigate("/");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
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
          Login
          <div className="underline"></div>
        </div>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <FaUser size={20} className="input-icon" />
            <input
              type="email"
              placeholder="Enter your Email"
              name="username"
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
              placeholder="Enter Password"
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
        </div>

        <div className="forgot-password">
          Forgot Password?{" "}
          <span onClick={() => navigate("/forgotpass")}>Click here!</span>
        </div>

        <div className="submit-container">
          <button
            type="submit"
            onClick={() => navigate("/signup")}
            className="submit"
          >
            Sign up
          </button>{" "}
          <button type="submit" className="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginComponent;
