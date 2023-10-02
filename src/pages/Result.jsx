import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Leaderboard() {
  const navigate = useNavigate();
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const user = useSelector((state) => state.user.userDetails);
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [currentUserResult, setCurrentUserResult] = useState({});

  useEffect(() => {
    if (quizzes && user) {
      const newQuizData = quizzes.find((quiz) => quiz._id === id) || {};
      setQuizData(newQuizData);
    }
  }, [quizzes, id]);

  useEffect(() => {
    if (quizData) {
      quizData.results.forEach((result) => {
        if (result.email === user.email) {
          setCurrentUserResult(result);
          console.log(result);
        }
      });
    }
  }, [quizData]);

  return (
    <>
      <div className="result-container my-5">
        <h5 className="text-center py-3">{quizData?.quizName} Result</h5>
        <h6 className="text-center pb-4">{user.name}</h6>
        <div className="pb-4">
          <table
            className="table table-striped mx-auto"
            style={{ width: "100%", maxWidth: "500px" }}
          >
            <tbody>
              <tr>
                <td style={{ textAlign: "left", fontWeight: "550" }}>
                  Total Questions
                </td>
                <td style={{ textAlign: "left" }}>{currentUserResult?.tq}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", fontWeight: "550" }}>
                  Answered Questions
                </td>
                <td style={{ textAlign: "left" }}>
                  {currentUserResult?.answeredQsn}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", fontWeight: "550" }}>
                  Correct Answers
                </td>
                <td style={{ textAlign: "left" }}>
                  {currentUserResult?.crctAns}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", fontWeight: "550" }}>
                  Total Marks
                </td>
                <td style={{ textAlign: "left" }}>
                  {currentUserResult.totalMarks}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    textAlign: "left",
                    fontWeight: "550",
                  }}
                >
                  Marks Obtained
                </td>
                <td style={{ textAlign: "left" }}>{currentUserResult.marks}</td>
              </tr>
            </tbody>
          </table>
          <div className="w-100 flex justify-content-center">
            <Link to="/">
              <button
                className="my-3 btn btn-primary my-3"
                style={{ width: "200px", margin: "0px calc(50% - 100px)" }}
              >
                Go Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
