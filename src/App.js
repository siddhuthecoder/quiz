import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";
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
import axios from "axios";
import { useEffect, useState } from "react";
import { userActions } from "./store/userSlice";
import { quizActions } from "./store/quizSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const usrDetails = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const base_url = process.env.REACT_APP_SERVER_ROUTE;
      try {
        const { data } = await axios.get(`${base_url}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(userActions.setUser(data.user));
        if (data.user.name === process.env.REACT_APP_ADMIN) {
          dispatch(userActions.setIsAdmin(true));
          navigate("/admin");
        } else {
          dispatch(userActions.setIsUser(true));
        }
      } catch (error) {
        console.log(error);
        alert(error?.response?.data || error.message);
        setIsLoading(false);
        navigate("/sign");
      }
    };
    const fetchQuizzes = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_ROUTE}/quiz`
        );
        dispatch(quizActions.setQuiz(data));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        alert(err?.response?.data.message || err.message);
        setIsLoading(false);
      }
    };
    fetchQuizzes();
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      navigate("/sign");
    }
  }, []);

  useEffect(() => {
    const filterQuizzes = () => {
      quizzes.map((quiz) => {
        let islive = true;
        quiz.results.map((result) => {
          if (result.email === usrDetails.email) {
            islive = false;
          }
        });
        if (islive) {
          dispatch(quizActions.addLive(quiz));
        } else {
          dispatch(quizActions.addAttempted(quiz));
        }
      });
    };
    if (quizzes && usrDetails) {
      filterQuizzes();
    }
  }, [quizzes, usrDetails]);

  return (
    <>
      {!isLoading ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/quiz/new" element={<CreateQuiz />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/quiz/leaderboard/:id" element={<Leaderboard />} />
          <Route path="/quiz/result/:id" element={<Result />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      ) : (
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
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
