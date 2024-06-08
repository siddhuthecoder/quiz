import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Sign,
  Home,
  NoPage,
  Admin,
  CreateQuiz,
  Quiz,
  Result,
  Leaderboard,
} from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser, userActions } from "./store/userSlice";
import { fetchQuizzes, quizActions } from "./store/quizSlice";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetails);
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);
  const quizError = useSelector((state) => state.quiz.error);
  const quizStatus = useSelector((state) => state.user.status);

  const quizzes = useSelector((state) => state.quiz.quizzes);
  const usrDetails = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (quizStatus === "idle" || userStatus === "idle") {
      dispatch(fetchUser(token));
    }
  }, [dispatch, navigate, quizStatus, userStatus]);

  useEffect(() => {
    const filterQuizzes = () => {
      quizzes.forEach((quiz) => {
        let isLive = true;
        quiz.results.forEach((result) => {
          if (result.email === usrDetails.email) {
            isLive = false;
          }
        });
        if (isLive) {
          dispatch(quizActions.addLive(quiz));
        } else {
          dispatch(quizActions.addAttempted(quiz));
        }
      });
    };

    if (quizzes && quizzes.length !== 0 && usrDetails) {
      filterQuizzes();
    }
  }, [quizzes, usrDetails, dispatch]);

  useEffect(() => {
    if (user && user.email) {
      if (user.email === process.env.REACT_APP_ADMIN_EMAIL) {
        dispatch(userActions.setIsUser(false));
        dispatch(userActions.setIsAdmin(true));
      } else {
        dispatch(userActions.setIsAdmin(false));
        dispatch(userActions.setIsUser(true));
      }
    }
    const token = localStorage.getItem("token");
    dispatch(fetchQuizzes(token));
  }, [user, dispatch]);

  useEffect(() => {
    if (userError && userError !== "") {
      if (userError === "No Token found" || quizError === "No Token Found") {
        navigate("/sign");
      } else if (
        userError === "Invalid Session" ||
        quizError === "Invalid Session"
      ) {
        toast.error("Invalid Session");
        localStorage.removeItem("token");
        navigate("/sign");
      }
    }
  }, [userError, quizError, navigate]);

  // Preloader here
  if (quizStatus === "loading" || userStatus === "loading") {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading😍...</span>
        </div>
      </div>
    );
  }

  if (userStatus === "loaded" && quizStatus === "loaded") {
    return (
      <>

        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/quiz/new" element={<CreateQuiz />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/quiz/leaderboard/:id" element={<Leaderboard />} />
          <Route path="/quiz/result/:id" element={<Result />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
