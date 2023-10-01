import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Result({ isAdmin }) {
  const navigate = useNavigate();
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const user = useSelector((state) => state.user.userDetails);
  const { id } = useParams();
  const [quizData, setQuizData] = useState({});
  const [sortedResults, setSortedResults] = useState([]);

  useEffect(() => {
    if (quizzes) {
      const newQuizData = quizzes.find((quiz) => quiz._id === id) || {};
      setQuizData(newQuizData);

      const newsortedResults = newQuizData.results
        ? [...newQuizData.results].sort((a, b) => b.marks - a.marks)
        : [];
      setSortedResults(newsortedResults);
    }
  }, [quizzes, id]);

  return (
    <>
      <div className="result-container my-5">
        <h2 className="text-center py-3">
          {quizData.quizName || "Quiz Not Found"} Result
        </h2>
        <div className="table-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {quizData && sortedResults.length > 0 ? (
                <>
                  {sortedResults.map((r, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{r.name}</td>
                      <td>{r.email}</td>
                      <td>{r.marks}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td className="py-5 text-center w-100" colSpan={4}>
                    No Results found
                  </td>
                </tr>
              )}
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
