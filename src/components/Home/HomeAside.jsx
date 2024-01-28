import React from "react";

const HomeAside = ({
  sideBar,
  contentNumber,
  setContentNumber,
  navToggle,
  logout,
  userData,
}) => {
  return (
    <aside className="sidebar" ref={sideBar}>
      <ul className="nav-list mb-5">
        <li
          className={contentNumber === 1 ? "nav-item active" : "nav-item"}
          onClick={() => {
            setContentNumber(1);
            navToggle();
          }}
        >
          <i className="bi bi-clipboard-data"></i>Dashboard
        </li>
        <li
          className={contentNumber === 2 ? "nav-item active" : "nav-item"}
          onClick={() => {
            setContentNumber(2);
            navToggle();
          }}
        >
          <i className="bi bi-card-list"></i>Quizzes
        </li>
        <li
          className={contentNumber === 3 ? "nav-item active" : "nav-item"}
          onClick={() => {
            setContentNumber(3);
            navToggle();
          }}
        >
          <i className="bi bi-card-list"></i>Test Updates
        </li>
        <li
          className={contentNumber === 4 ? "nav-item active" : "nav-item"}
          onClick={() => {
            setContentNumber(4);
            navToggle();
          }}
        >
          <i className="bi bi-easel"></i>Results
        </li>
        <div
          className="log-out d-md-none d-flex"
          title="Log Out"
          onClick={logout}
        >
          {userData && userData?.name}
          &nbsp;<i className="bi bi-box-arrow-in-right"></i>
        </div>
      </ul>
    </aside>
  );
};

export default HomeAside;
