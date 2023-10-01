import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Header } from "../components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { quizActions } from "../store/quizSlice";

export default function Admin() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (quizzes) {
      setIsLoading(false);
    }
  }, [quizzes]);

  return (
    <>
      <Header />
      {isAdmin && (
        <div className="container mt-5">
          <h4>Quiz Dasboard</h4>
          <div style={{ width: "200px" }}>
            <Link
              to="/quiz/new"
              style={{ textDecoration: "none" }}
              scroll="top"
            >
              <Button text="New Quiz" />
            </Link>
          </div>
          {!isLoading ? (
            <div className="mt-4 row d-flex" style={{ alignItems: "center" }}>
              {quizzes &&
                quizzes.length > 0 &&
                quizzes.map((quiz) => {
                  let link = `/quiz/${quiz._id}`;
                  let resultLink = `/quiz/result/${quiz._id}`;
                  let deleteUrl = `${process.env.REACT_APP_SERVER_ROUTE}/quiz/${quiz._id}`;
                  return (
                    <div
                      key={quiz._id}
                      className="col-12 col-md-6 col-lg-4 mb-3"
                    >
                      <div className="card p-3" style={{ height: "100%" }}>
                        <h3 style={{ marginBottom: "0px" }}>{quiz.quizName}</h3>
                        <h6 style={{ color: "#777" }} align="right">
                          - {quiz.quizCreator}
                        </h6>
                        <p style={{ marginBottom: "190px" }}>{quiz.quizDesc}</p>
                        <div
                          style={{
                            position: "absolute",
                            bottom: "0px",
                            width: "90%",
                          }}
                        >
                          <p>
                            <Link to={link}>
                              {BASE_URL}/quiz/{quiz._id}
                            </Link>
                          </p>
                          <Link style={{ width: "100%" }} to={resultLink}>
                            <button className="btn btn-sm btn-primary w-100">
                              View Results
                            </button>
                          </Link>
                          <div
                            className="d-flex"
                            style={{
                              justifyContent: "space-between",
                              width: "90%",
                            }}
                          >
                            <div className="p-3">
                              <i className="bi bi-clock"></i>&nbsp;&nbsp;
                              <span>{quiz.quizTime} min</span>
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              className="p-3"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this quiz"
                                  )
                                ) {
                                  const token = localStorage.getItem("token");
                                  try {
                                    axios.delete(`${deleteUrl}`, {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    });
                                    alert("Quiz Deleted Successfully");
                                    dispatch(quizActions.deleteQuiz(quiz._id));
                                  } catch (error) {
                                    console.log(error.message);
                                  }
                                }
                              }}
                            >
                              <i className="bi bi-trash"></i>&nbsp;&nbsp;
                              <span>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div
              style={{ width: "100%", minHeight: "300px", marginTop: "100px" }}
              className="d-flex justify-content-center aign-items-center"
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
