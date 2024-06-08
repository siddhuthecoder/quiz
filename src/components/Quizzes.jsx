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
              <div className="quiz-sec ">
                <h4 style={{ color: "#006996" }}>Live Quizzes</h4>
               <div  className="my-4 d-flex flex-wrap gap-4" >

                  {liveQuizzes.map((quiz) => {
                    return (
                      <div key={quiz._id}>
                    <div className="card" style={{
      position: 'relative',
      width: '350px',
      maxWidth: '100%',
      overflow: 'hidden',
      padding: '6px',
      border: '4px solid #fff',
      borderRadius: '1rem',
      background: 'rgba(255, 255, 255, 0.4)',
      boxShadow: '15px 15px 20px rgba(0, 0, 0, 0.3)',
      transition: 'all .5s ease-in-out',
      boxSizing: 'border-box',
    }}>

                          <div className="card-body">
                            <h5 className=" font-semibold text-bold  "   style={{ fontWeight:"bold", fontSize:"30px" } } >{quiz.quizName}</h5>
                            <p className="card-text">{quiz.quizDesc}</p>
                            <Link
                              to={`/quiz/${quiz._id}`}
                              className="btn "
                              style={{ color: '#006996', border: '1px solid #006996', padding:"7px" }}
                            
                            >
                              
                              Attempt Now 👉
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
              <div className="my-4 d-flex flex-wrap gap-4" >
                {attemptedQuiz.map((quiz) => {
                  return (
                    <div key={quiz._id} >
                      <div className="card" style={{
      position: 'relative',
      width: '350px',
      maxWidth: '100%',
      overflow: 'hidden',
      padding: '1rem',
      border: '4px solid #fff',
      borderRadius: '1rem',
      background: 'rgba(255, 255, 255, 0.4)',
      boxShadow: '15px 15px 20px rgba(0, 0, 0, 0.3)',
      transition: 'all .5s ease-in-out',
      boxSizing: 'border-box',
    }}>
                        <div className="card-body">
                          <h5 className="font-semibold " style={{ fontWeight:"bold", fontSize:"30px" }}>{quiz.quizName}</h5>
                          <p className="card-text">{quiz.quizDesc}</p>
                          <div className="d-flex gap-3">
                            <Link
                              to={`/quiz/result/${quiz._id}`}
                              className="btn btn-sm "
                              style={{ color: '#006996', border: '1px solid #006996', padding:"7px" }}
                            >
                              View Result😍
                            </Link>
                            <Link
                              to={`/quiz/leaderboard/${quiz._id}`}
                              className="btn "
                              style={{ color: '#006996', border: '1px solid #006996', padding:"8px" }}
                            >
                              Leaderboard🏆
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

