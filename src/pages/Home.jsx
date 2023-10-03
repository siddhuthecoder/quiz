import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { Quizzes, Dashboard, TestUpdates, Results } from "../components";
import logo from "../images/logo.png";

export default function Home() {
  const isUser = useSelector((state) => state.user.isUser);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userDetails);
  const [contentNumber, setContentNumber] = useState(1);
  const navigate = useNavigate();
  const sideBar = useRef(null);

  useEffect(() => {
    if (!isUser) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/sign");
      }
    }
  }, [isUser, navigate]);

  const navToggle = () => {
    sideBar.current.classList.toggle("active");
  };

  const logout = () => {
    localStorage.clear();
    dispatch(userActions.setIsUser(false));
    dispatch(userActions.setUser(null));
    window.location.reload();
  };

  return (
    <>
      <header className="sides">
        <div className="w-100 d-flex justify-content-between py-1">
          <div
            style={{ height: "55px" }}
            className="d-flex align-items-center logo-thing"
          >
            <i className="bi bi-list d-lg-none" onClick={navToggle}></i>
            <img
              src={logo}
              alt="quiz logo"
              className="p-2"
              style={{ height: "100%" }}
            />
          </div>
          <div className="d-flex align-items-center">
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#000",
                color: "white",
                cursor: "pointer",
              }}
              title={userData.name}
              className="d-flex justify-content-center align-items-center"
            >
              <b>{userData.name.charAt(0)}</b>
            </div>
            <button className="btn d-none d-md-block" onClick={logout}>
              <b>Logout</b>
            </button>
          </div>
        </div>
      </header>

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
            {userData?.name}
            &nbsp;<i className="bi bi-box-arrow-in-right"></i>
          </div>
        </ul>
      </aside>

      <main className="sides-main" style={{ background: "#ECF0F5" }}>
        {contentNumber === 1 && (
          <>
            <Dashboard />
          </>
        )}
        {contentNumber === 2 && (
          <>
            <Quizzes />
          </>
        )}
        {contentNumber === 3 && (
          <>
            <TestUpdates />
          </>
        )}
        {contentNumber === 4 && (
          <>
            <Results />
          </>
        )}
      </main>
    </>
  );
}
