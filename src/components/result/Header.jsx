import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpg";
import test from "../../images/test.png";

const Header = ({ quizData }) => {
  return (
    <header
      style={{ height: "60px", position: "sticky", top: "0", width: "100%" }}
      className="d-flex justify-content-between px-1 px-sm-2"
    >
      <Link to="/" style={{ width: "60px", height: "60px" }}>
        <img
          src={logo}
          alt="quiz logo"
          style={{ height: "100%", width: "100%" }}
        />
      </Link>
      <div className="d-flex gap-2 align-items-center">
        <img src={test} alt="test" style={{ height: "30px" }} />
        <h5 style={{ color: "#0073A5" }} className="mb-0">
          {quizData?.quizName}
        </h5>
      </div>
    </header>
  );
};

export default Header;
