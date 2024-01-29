import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Quizzes, Dashboard, TestUpdates, Results } from "../components";
import HomeHeader from "../components/Home/HomeHeader";
import HomeAside from "../components/Home/HomeAside";

export default function Home() {
  const userData = useSelector((state) => state.user.userDetails);
  const [contentNumber, setContentNumber] = useState(1);
  const sideBar = useRef(null);

  const navToggle = () => {
    sideBar.current.classList.toggle("active");
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isUser = useSelector((state) => state.user.isUser);

  useEffect(() => {
    if (isUser) {
      if (isAdmin) {
        navigate("/admin");
      }
    } else {
      navigate("/sign");
    }
  }, [isUser, isAdmin, navigate]);

  return (
    <>
      <HomeHeader logout={logout} navToggle={navToggle} userData={userData} />
      <HomeAside
        logout={logout}
        navToggle={navToggle}
        userData={userData}
        contentNumber={contentNumber}
        setContentNumber={setContentNumber}
        sideBar={sideBar}
      />

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
