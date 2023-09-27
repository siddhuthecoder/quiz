import React from "react";

export default function Button({ text }) {
  return (
    <button className="mt-3 quiz-btn d-flex align-items-center">
      <i
        className="bi bi-plus"
        style={{ fontSize: "22px", marginRight: "10px" }}
      ></i>{" "}
      <span>{text}</span>
    </button>
  );
}
