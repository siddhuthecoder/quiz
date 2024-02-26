import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { quizActions } from "../store/quizSlice";
import FileBase from "react-file-base64";

export default function CreateQuiz() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();
  const [currentQsn, setCurrentQsn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [addQuestion, setAddQuestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
    value: "",
    img: "",
  });
  const [quiz, setQuiz] = useState({
    quizName: "",
    quizCreator: "",
    quizDesc: "",
    quizTime: "",
    quizQuestions: [],
  });

  //use Effects
  useEffect(() => {
    console.log(isAdmin);
    if (!isAdmin) {
      navigate("/sign");
    }
  }, [navigate, isAdmin]);

  useEffect(() => {
    if (currentQsn) {
      setAddQuestion({
        question: currentQsn.question,
        option1: currentQsn.option1,
        option2: currentQsn.option2,
        option3: currentQsn.option3,
        option4: currentQsn.option4,
        correctOption: currentQsn.correctOption,
        value: currentQsn.value,
        img: currentQsn.img,
      });
    }
  }, [currentQsn]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (quiz.quizQuestions.length > 0) {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_ROUTE}/quiz`,
          quiz,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(quizActions.addQuiz(data));
        setQuiz({
          quizName: "",
          quizCreator: "",
          quizDesc: "",
          quizTime: "",
          quizQuestions: [],
        });
        navigate("/admin");
      } catch (error) {
        alert(error?.response?.data.message || error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const deleteQsn = (qsnq) => {
    const updatedQuestions = questions.filter((qsn) => qsn.question !== qsnq);
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <Header />
      <main className="mt-4">
        <h3 align="center">Create New Quiz</h3>
        <form
          className="my-4 p-3 pt-4 new_quiz_form"
          style={{ boxShadow: "0px 0px 20px 5px rgba(1,16,112,0.1)" }}
        >
          <div className="form-side-heading mb-3">
            <h5>Quiz Details</h5>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  autoFocus
                  value={quiz.quizName}
                  onChange={(e) =>
                    setQuiz({ ...quiz, quizName: e.target.value })
                  }
                  placeholder="Quiz Name *"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  value={quiz.quizCreator}
                  onChange={(e) =>
                    setQuiz({ ...quiz, quizCreator: e.target.value })
                  }
                  placeholder="Quiz Creator *"
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  value={quiz.quizTime}
                  onChange={(e) =>
                    setQuiz({ ...quiz, quizTime: e.target.value })
                  }
                  placeholder="Time Limit in min (e.g 60)"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <textarea
                  className="form-control"
                  value={quiz.quizDesc}
                  onChange={(e) =>
                    setQuiz({ ...quiz, quizDesc: e.target.value })
                  }
                  placeholder="Quiz Description"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-side-heading mb-3">
            <h5>Add Question</h5>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group mb-3">
                <textarea
                  className="form-control"
                  placeholder="Question *"
                  value={addQuestion.question}
                  onChange={(e) =>
                    setAddQuestion({ ...addQuestion, question: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mb-3">
                <label htmlFor="q-img" className="form-label">
                  Image
                </label>
                <br />
                <FileBase
                  className="form-control"
                  type="file"
                  id="q-img"
                  onDone={({ base64 }) =>
                    setAddQuestion({ ...addQuestion, img: base64 })
                  }
                ></FileBase>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Option 1 *"
                  value={addQuestion.option1}
                  onChange={(e) =>
                    setAddQuestion({ ...addQuestion, option1: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Option 2 *"
                  value={addQuestion.option2}
                  onChange={(e) =>
                    setAddQuestion({ ...addQuestion, option2: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Option 3"
                  value={addQuestion.option3}
                  onChange={(e) =>
                    setAddQuestion({ ...addQuestion, option3: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Option 4"
                  value={addQuestion.option4}
                  onChange={(e) =>
                    setAddQuestion({ ...addQuestion, option4: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Correct Option *"
                  value={addQuestion.correctOption}
                  onChange={(e) =>
                    setAddQuestion({
                      ...addQuestion,
                      correctOption: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="value *"
                  value={addQuestion.value}
                  onChange={(e) =>
                    setAddQuestion({ ...addQuestion, value: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "200px", margin: "auto" }}
              onClick={() => {
                if (
                  addQuestion.option1 !== addQuestion.correctOption &&
                  addQuestion.option2 !== addQuestion.correctOption &&
                  addQuestion.option3 !== addQuestion.correctOption &&
                  addQuestion.option4 !== addQuestion.correctOption
                ) {
                  alert("Correct Option is not in the specified Options");
                } else if (isNaN(Number(addQuestion.value))) {
                  alert("Value Must be an Integer");
                } else {
                  setQuestions([...questions, addQuestion]);
                  setAddQuestion({
                    question: "",
                    option1: "",
                    option2: "",
                    option3: "",
                    option4: "",
                    correctOption: "",
                    value: "",
                  });
                }
              }}
            >
              Add Question
            </button>
          </div>
          {questions.length !== 0 && (
            <>
              <div className="form-side-heading mb-3 mt-3">
                <h5>Questions</h5>
              </div>
              {questions.map((q, index) => (
                <div
                  key={index}
                  style={{ width: "100%" }}
                  className="d-flex justify-content-between align-items-center"
                >
                  <p className="mx-2 mb-0">
                    {index + 1}. {q.question}
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn mr-2"
                      style={{ padding: "1px 7px" }}
                      onClick={() => {
                        setCurrentQsn(q);
                        deleteQsn(q.question);
                      }}
                    >
                      <i
                        style={{ fontSize: "15px" }}
                        className="bi bi-pencil-square"
                      ></i>
                    </button>
                    <button
                      className="btn"
                      style={{ padding: "1px 7px" }}
                      onClick={() => deleteQsn(q.question)}
                    >
                      <i
                        style={{
                          fontSize: "15px",
                        }}
                        className="bi bi-trash3"
                      ></i>
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
          <div className="d-flex" style={{ justifyContent: "flex-end" }}>
            <button
              className="mt-5 btn btn-success mx-auto d-flex justify-content-center"
              type="button"
              style={{ width: "300px", right: "0" }}
              onClick={(e) => {
                if (questions.length === 0) {
                  alert("No Questions are added");
                } else if (isNaN(Number(quiz.quizTime))) {
                  alert("Time Should be integer");
                } else {
                  setQuiz({ ...quiz, quizQuestions: questions });
                  handleSubmit(e);
                }
              }}
            >
              {!isLoading ? (
                `Submit`
              ) : (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
