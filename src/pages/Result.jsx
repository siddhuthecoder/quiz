import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Leaderboard() {
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
  }, [quizzes, id, user]);

  useEffect(() => {
    if (quizData) {
      quizData.results.forEach((result) => {
        if (result.email === user.email) {
          setCurrentUserResult(result);
        }
      });
    }
  }, [quizData, user.email]);

  return (
    
    <div style={{ background: "#E8F2FF" ,height:"100vh" , paddingTop:"50px"}} >
    <div className="result-container " style={{
      position: 'relative',
      width: '700px',
      maxWidth: '100%',
     
      overflow: 'hidden',
      padding: '1rem',
      border: '4px solid #fff',
      borderRadius: '1rem',
      background: 'rgba(255, 255, 255, 0.4)',
      boxShadow: '15px 15px 20px rgba(0, 0, 0, 0.3)',
      transition: 'all .5s ease-in-out',
      boxSizing: 'border-box',
    }} >
      <h5 className="text-center py-3">{quizData?.quizName} Result</h5>
      <h6 className="text-center pb-4">{user.name}</h6>
      <div className="pb-4">
        <div className="card mb-3 score-card" style={{ margin: "0 auto" }}>
          <div className="card-body text-center">
            <h5 className="card-title">Score</h5>
            <p className="card-text">
              <strong>{currentUserResult?.marks} / {currentUserResult?.totalMarks}</strong>
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card mb-3 result-card">
              <div className="card-body text-center">
                <i className="bi bi-question-circle result-icon"></i>
                <h5 className="card-title">Total Questions</h5>
                <p className="card-text">{currentUserResult?.tq}</p>
                <p className="card-text">Questions</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-3 result-card">
              <div className="card-body text-center">
                <i className="bi bi-list-check result-icon"></i>
                <h5 className="card-title">Answered Questions</h5>
                <p className="card-text">{currentUserResult?.answeredQsn}</p>
                <p className="card-text">Questions</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-3 result-card">
              <div className="card-body text-center">
                 <i className="bi bi-check-circle result-icon " ></i>
                <h5 className="card-title">Correct Answers</h5>
                <p className="card-text">{currentUserResult?.crctAns}</p>
                <p className="card-text">Questions</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 text-center">
          <Link to="/">
            <button className="btn btn-primary my-3" style={{ width: "200px" }}>
              Go Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

// Add custom CSS styles
const styles = `

.result-container {
  max-width: 900px;
  margin: 0 auto;
}
.score-card {
  width: 175px;
  height: 175px;
  margin: 0 auto 20px auto;
}
.result-card {
  width: 175px;
  height: 175px;
  margin: 0 auto 20px auto;
}
.result-icon {
  width: 90px;
  height: 90px;
  margin-bottom: 10px;
}
`;

// Add styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
