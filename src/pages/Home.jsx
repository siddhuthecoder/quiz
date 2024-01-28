import { useState, useRef } from "react";
import { useSelector } from "react-redux";
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
