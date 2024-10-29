/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import Account from "../assests/user.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/userinfo", { withCredentials: true })
      .then((res) => {
        if (res.data.status === "200OK") {
          setName(res.data.name);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.status === "200OK") {
          navigate("/login");
        } else {
          alert("Error during logout");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <header>
      <div className="bg-light py-3 ">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
              <Link className="navbar-brand fw-bold text-success" to={"/"}>
                Wmarket
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-center ps-5"
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link active fw-medium"
                      aria-current="page"
                      to={"/"}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to={"/shop"}>
                      Shop
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to={"/news"}>
                      News
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to={"/earn"}>
                      Earn
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to={"/profile"}>
                      Profile
                    </Link>
                  </li>
                </ul>
                <form className="form-inline d-flex mx-lg-3 gap-2 d-lg-none d-sm-flex">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-warning my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </div>
              <form className="form-inline d-flex mx-lg-3 gap-2 d-sm-none d-lg-flex">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-warning my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <div className="d-flex align-content-center border-0">
                <div className="dropdown">
                  <img src={Account} alt="" width="25px" />
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "black",
                    }}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {name}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => navigate("/signup")}
                className="btn btn-success my-2 my-sm-0"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
