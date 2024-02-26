import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { quizActions } from "../store/quizSlice";

const QuizTimer = ({ min, onTimeUp }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(min * 60);
  useEffect(() => {
    const IntervalId = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining((p) => p - 1);
      } else {
        clearInterval(IntervalId);
        onTimeUp();
      }
    }, 1000);
    return () => {
      clearInterval(IntervalId);
    };
  }, [secondsRemaining, onTimeUp]);

  const formattedMinutes = String(Math.floor(secondsRemaining / 60)).padStart(
    2,
    "0"
  );
  const formattedSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <>
      {formattedMinutes}:{formattedSeconds}
    </>
  );
};

export default function Quiz() {
  const { id } = useParams();
  const usrDetails = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quizData, setQuizData] = useState({});
  const [isQuiz, setIsQuiz] = useState(false);
  const [questionNo, setQuestionNo] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [correctOptions, setCorrectOptions] = useState([]);
  const [markings, setMarkings] = useState([]);

  const handleOptionSelect = (qindex, value) => {
    setSelectedOptions((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[qindex] = value;
      return updatedOptions;
    });
  };

  const handleMarkingChange = (qindex, value) => {
    setMarkings((prev) => {
      const updatedMarking = [...prev];
      updatedMarking[qindex] = value;
      return updatedMarking;
    });
  };

  const handleQuizSubmit = async () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_ROUTE;
    let aq = 0;
    let x = 0;
    while (x < correctOptions.length) {
      if (selectedOptions[x]) {
        aq += 1;
      }
      x += 1;
    }
    let ca = 0;
    let m = 0;
    let tm = 0;
    let y = 0;
    while (y < correctOptions.length) {
      if (selectedOptions[y] === correctOptions[y]) {
        ca += 1;
        m += parseInt(quizData.quizQuestions[y].value);
      }
      tm += parseInt(quizData.quizQuestions[y].value);
      y += 1;
    }
    setIsQuiz(false);
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${SERVER_URL}/quiz/${quizData._id}/result`,
        {
          quizResult: {
            name: usrDetails.name,
            email: usrDetails.email,
            totalMarks: tm,
            marks: m,
            crctAns: ca,
            answeredQsn: aq,
            tq: correctOptions.length,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(quizActions.removeLive(data._id));
      dispatch(quizActions.addAttempted(data));
      dispatch(quizActions.updateQuiz(data));
      navigate(`/quiz/result/${id}`);
    } catch (error) {
      alert(error?.response?.data.message || error.message);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      const SERVER_URL = process.env.REACT_APP_SERVER_ROUTE;
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`${SERVER_URL}/quiz/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizData(data);
        setIsQuiz(true);
      } catch (error) {
        alert(error?.response?.data.message || error.message);
        navigate("/");
      }
    };
    fetchQuiz();
  }, [id, navigate]);

  useEffect(() => {
    if (
      quizData &&
      quizData.quizQuestions &&
      quizData.quizQuestions.length > 0
    ) {
      let isValid = true;
      quizData.results.forEach((result) => {
        if (result.email === usrDetails.email) {
          isValid = false;
        }
      });
      if (!isValid) {
        alert("You already attempted this quiz");
        navigate("/");
      } else {
        const correctOptionsArray = quizData.quizQuestions.map(
          (q) => q.correctOption
        );
        setCorrectOptions(correctOptionsArray);
        const intialMarkings = new Array(correctOptionsArray.length).fill(
          "Not Visited"
        );
        setMarkings(intialMarkings);
        handleMarkingChange(0, "Not Answered");
      }
    }
  }, [quizData, navigate, usrDetails.email]);

  return (
    <>
      {quizData &&
      quizData.quizQuestions &&
      quizData.quizQuestions.length > 0 ? (
        <>
          {isQuiz && (
            <>
              <div
                className="my-5 mx-auto"
                style={{
                  width: "98%",
                  maxWidth: "1100px",
                  margin: "auto",
                  boxShadow: "0px 0px 20px 5px rgba(1,49,142,0.1)",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{
                    justifyContent: "space-between",
                    padding: "5px 20px",
                    borderBottom: "0.2px solid #aaa",
                  }}
                >
                  <h1>
                    <i
                      className="bi bi-building-add"
                      style={{ marginRight: "10px" }}
                    ></i>
                    {quizData.quizName}
                  </h1>
                  <h4>
                    Time Left :-{" "}
                    <QuizTimer
                      min={parseInt(quizData.quizTime)}
                      onTimeUp={handleQuizSubmit}
                    />
                  </h4>
                </div>
                <div
                  style={{ backgroundColor: "#ECF0F5" }}
                  className="quizContainer"
                >
                  <main style={{ position: "relative" }}>
                    <div className="qn-container">
                      <div className="qn">
                        Question No&nbsp;:-&nbsp;&nbsp;
                        {questionNo}
                      </div>
                      <div className="marks">
                        Marks :- +{quizData.quizQuestions[questionNo - 1].value}
                      </div>
                    </div>
                    <div className="question-container">
                      <h4>
                        Q.&nbsp;
                        {quizData.quizQuestions[questionNo - 1].question}
                      </h4>
                      <div
                        style={{
                          width: "90%",
                          margin: "auto",
                          padding: "0px 10px",
                        }}
                      >
                        {quizData.quizQuestions[questionNo - 1].img !== "" && (
                          <img
                            src={quizData.quizQuestions[questionNo - 1].img}
                            alt="quesiton-img"
                            style={{ width: "50%" }}
                            className="img-container"
                          />
                        )}
                      </div>
                      <label htmlFor={`qans-${questionNo}-1`}>
                        <input
                          type="radio"
                          name={`qans-${questionNo}`}
                          id={`qans-${questionNo}-1`}
                          value={quizData.quizQuestions[questionNo - 1].option1}
                          checked={
                            selectedOptions[questionNo - 1] ===
                            quizData.quizQuestions[questionNo - 1].option1
                          }
                          onChange={() =>
                            handleOptionSelect(
                              questionNo - 1,
                              quizData.quizQuestions[questionNo - 1].option1
                            )
                          }
                        />
                        {quizData.quizQuestions[questionNo - 1].option1}
                      </label>
                      <label htmlFor={`qans-${questionNo}-2`}>
                        <input
                          type="radio"
                          name={`qans-${questionNo}`}
                          id={`qans-${questionNo}-2`}
                          value={quizData.quizQuestions[questionNo - 1].option2}
                          checked={
                            selectedOptions[questionNo - 1] ===
                            quizData.quizQuestions[questionNo - 1].option2
                          }
                          onChange={() =>
                            handleOptionSelect(
                              questionNo - 1,
                              quizData.quizQuestions[questionNo - 1].option2
                            )
                          }
                        />
                        {quizData.quizQuestions[questionNo - 1].option2}
                      </label>
                      <label htmlFor={`qans-${questionNo}-3`}>
                        <input
                          type="radio"
                          name={`qans-${questionNo}`}
                          id={`qans-${questionNo}-3`}
                          value={quizData.quizQuestions[questionNo - 1].option3}
                          checked={
                            selectedOptions[questionNo - 1] ===
                            quizData.quizQuestions[questionNo - 1].option3
                          }
                          onChange={() =>
                            handleOptionSelect(
                              questionNo - 1,
                              quizData.quizQuestions[questionNo - 1].option3
                            )
                          }
                        />
                        {quizData.quizQuestions[questionNo - 1].option3}
                      </label>
                      <label
                        htmlFor={`qans-${questionNo}-4`}
                        className="mb-option"
                      >
                        <input
                          type="radio"
                          name={`qans-${questionNo}`}
                          id={`qans-${questionNo}-4`}
                          value={quizData.quizQuestions[questionNo - 1].option4}
                          checked={
                            selectedOptions[questionNo - 1] ===
                            quizData.quizQuestions[questionNo - 1].option4
                          }
                          onChange={() =>
                            handleOptionSelect(
                              questionNo - 1,
                              quizData.quizQuestions[questionNo - 1].option4
                            )
                          }
                        />
                        {quizData.quizQuestions[questionNo - 1].option4}
                      </label>
                    </div>
                    <div className="quiz-btns">
                      <button
                        type="button"
                        className={
                          questionNo === 1 ? "d-none" : "btn btn-primary"
                        }
                        onClick={() => {
                          handleOptionSelect(
                            questionNo - 1,
                            selectedOptions[questionNo - 1]
                          );
                          if (selectedOptions[questionNo - 1]) {
                            handleMarkingChange(questionNo - 1, "Saved");
                          }
                          if (markings[questionNo - 2] === "Not Visited") {
                            handleMarkingChange(questionNo - 2, "Not Answered");
                          }
                          setQuestionNo((prev) => prev - 1);
                        }}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className={
                          quizData.quizQuestions.length !== questionNo
                            ? "btn btn-warning"
                            : "d-none"
                        }
                        onClick={() => {
                          handleOptionSelect(
                            questionNo - 1,
                            selectedOptions[questionNo - 1]
                          );
                          handleMarkingChange(questionNo - 1, "Review");
                          setQuestionNo((prev) => prev + 1);
                        }}
                      >
                        Review & Next
                      </button>
                      <button
                        type="button"
                        className={
                          quizData.quizQuestions.length !== questionNo
                            ? "btn btn-primary"
                            : "d-none"
                        }
                        onClick={() => {
                          handleOptionSelect(
                            questionNo - 1,
                            selectedOptions[questionNo - 1]
                          );
                          if (selectedOptions[questionNo - 1]) {
                            handleMarkingChange(questionNo - 1, "Saved");
                          } else {
                            handleMarkingChange(questionNo - 1, "Not Answered");
                          }
                          setQuestionNo((prev) => prev + 1);
                        }}
                      >
                        Save & Next
                      </button>
                      <button
                        type="button"
                        className={
                          quizData.quizQuestions.length === questionNo
                            ? "btn btn-success"
                            : "d-none"
                        }
                        onClick={() => {
                          if (
                            window.confirm("Are You Sure ou want to submit?")
                          ) {
                            handleQuizSubmit();
                          }
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </main>
                  <aside>
                    <div className="quiz-aside-user">
                      <h5>{usrDetails.name}</h5>
                      <i
                        className="bi bi-person text-primary"
                        style={{ fontSize: "26px" }}
                      ></i>
                    </div>
                    <div className="quiz-qpalette">
                      <h4>Quesition Pallette : </h4>
                      <div className="quiz_marking">
                        <div>
                          <p>Answered</p>
                          <span style={{ background: "#0d6efd" }}></span>
                        </div>
                        <div>
                          <p>Not Answered</p>
                          <span style={{ background: "#fff" }}></span>
                        </div>
                        <div>
                          <p>Marked for review</p>
                          <span style={{ background: "#ffc107" }}></span>
                        </div>
                        <div>
                          <p>Not visited</p>
                          <span style={{ background: "#ddd" }}></span>
                        </div>
                      </div>
                      <div className="pallette">
                        {quizData.quizQuestions.map((q, index) => (
                          <div
                            className="d-flex"
                            style={{
                              background:
                                markings[index] === "Not Visited"
                                  ? "#ddd"
                                  : markings[index] === "Saved"
                                  ? "#0d6efd"
                                  : markings[index] === "Not Answered"
                                  ? "#fff"
                                  : "#ffc107",
                            }}
                            key={index}
                            onClick={() => {
                              setQuestionNo(index + 1);
                              if (markings[index] === "Not Visited") {
                                handleMarkingChange(index, "Not Answered");
                              }
                            }}
                          >
                            <p>{index + 1}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </>
          )}
          {!isQuiz && isLoading && (
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      )}
    </>
  );
}
