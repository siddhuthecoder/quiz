import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpg";

const HomeHeader = ({ navToggle, userData, logout }) => {
  return (
    <header className="sides">
      <div className="w-100 d-flex justify-content-between py-1 px-0 px-md-1">
        <div
          style={{ height: "55px" }}
          className="d-flex align-items-center gap-1"
        >
          <i className="bi bi-list d-lg-none" onClick={navToggle}></i>
          <Link to="/" style={{ width: "60px", height: "60px" }}>
            <img
              src={logo}
              alt="quiz logo"
              style={{ height: "100%", width: "100%" }}
            />
          </Link>
          <h1
            style={{
              fontSize: "1.7rem",
              color: "black",
            }}
            className="d-none d-lg-block mb-1"
          >
            C.O.D.E
          </h1>
        </div>
        <div className="d-flex align-items-center gap-2 px-md-2">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#000",
              color: "white",
              cursor: "pointer",
              fontSize: "20px",
            }}
            title={userData && userData.name}
            className="d-flex justify-content-center align-items-center"
          >
            <b>{userData && userData.name.charAt(0).toUpperCase()}</b>
          </div>
          <button className="btn btn-dark d-none d-md-block" onClick={logout}>
            <b>Logout</b>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
