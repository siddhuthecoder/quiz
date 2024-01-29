import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Quizzes = () => {
  const liveQuizzes = useSelector((state) => state.quiz.liveQuizzes);
  const attemptedQuiz = useSelector((state) => state.quiz.attemptedQuizzes);
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const quizzesStatus = useSelector((state) => state.quiz.status);

  return (
    <>
      {quizzesStatus === "loading" ? (
        <div
          style={{ width: "100%", minHeight: "300px", marginTop: "100px" }}
          className="d-flex justify-content-center aign-items-center"
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {liveQuizzes.length > 0 && liveQuizzes && (
            <>
              <div className="quiz-sec">
                <h4 style={{ color: "#006996" }}>Live Quizzes</h4>
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
                              className="btn btn-sm btn-outline-primary"
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
              <h4 style={{ color: "#006996" }}>Attempted Quizzes</h4>
              <div className="my-4 d-flex flex-wrap gap-4">
                {attemptedQuiz.map((quiz) => {
                  return (
                    <div key={quiz._id}>
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                          <h5 className="card-title">{quiz.quizName}</h5>
                          <p className="card-text">{quiz.quizDesc}</p>
                          <div className="d-flex gap-3">
                            <Link
                              to={`/quiz/result/${quiz._id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              View Result
                            </Link>
                            <Link
                              to={`/quiz/leaderboard/${quiz._id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              Leaderboard
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {quizzes && quizzes.length === 0 && (
            <>
              <div style={{ width: "100%", height: "calc(100% - 70px)" }}>
                <h5>No Quizzes Found</h5>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Quizzes;
