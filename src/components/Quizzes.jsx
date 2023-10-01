import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Quizzes = () => {
  const liveQuizzes = useSelector((state) => state.quiz.liveQuizzes);
  const attemptedQuiz = useSelector((state) => state.quiz.attemptedQuizzes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(liveQuizzes);
    console.log(attemptedQuiz);
  }, [liveQuizzes, attemptedQuiz]);

  return (
    <>
      {isLoading ? (
        <>
          {liveQuizzes.length > 0 && liveQuizzes && (
            <>
              <div className="quiz-sec">
                <h4>Live Quizzes</h4>
                <div className="my-4 d-flex flex-wrap gap-4">
                  {liveQuizzes.map((quiz) => {
                    return (
                      <div key={quiz._id}>
                        <div className="card" style={{ width: "18rem" }}>
                          <div className="card-body">
                            <h5 className="card-title">{quiz.quizName}</h5>
                            <p className="card-text">{quiz.quizDesc}</p>
                            <Link
                              to={`/quiz/${quiz._id}`}
                              className="btn btn-sm btn-primary"
                            >
                              Attempt Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          {attemptedQuiz && attemptedQuiz.length > 0 && (
            <div className="quiz-sec">
              <h4>Attempted Quizzes</h4>
              <div className="my-4 d-flex flex-wrap gap-4">
                {attemptedQuiz.map((quiz) => {
                  return (
                    <div key={quiz._id}>
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                          <h5 className="card-title">{quiz.quizName}</h5>
                          <p className="card-text">{quiz.quizDesc}</p>
                          <Link
                            to={`/quiz/result/${quiz._id}`}
                            className="btn btn-sm btn-primary"
                          >
                            View Result
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {liveQuizzes.length > 0 && attemptedQuiz.length > 0 && (
            <>
              <div style={{ width: "100%", height: "calc(100% - 70px)" }}>
                <h5>No Quizzes Found</h5>
              </div>
            </>
          )}
        </>
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
    </>
  );
};

export default Quizzes;