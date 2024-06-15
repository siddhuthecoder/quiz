import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Quizzes, Dashboard, TestUpdates, Results } from "../components";
import HomeHeader from "../components/Home/HomeHeader";
import HomeAside from "../components/Home/HomeAside";
import Team  from "./Team";
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
    if (isAdmin) {
      navigate("/admin");
    }
    if (!isAdmin && !isUser) {
      navigate("/sign");
    }
    //eslint-disable-next-line
  }, [isUser, isAdmin]);

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

      <main className="sides-main " >
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
        {contentNumber === 5 && (
          <>
            <Team/>
          </>
        )}
      </main>
    </>
  );
}
