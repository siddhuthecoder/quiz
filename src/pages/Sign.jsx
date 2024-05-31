import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Register from "../images/log.svg";
import Login from "../images/register.svg";
import { fetchQuizzes } from "../store/quizSlice";
import { userActions } from "../store/userSlice";

export default function Sign() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isLoding, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
  };
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isUser = useSelector((state) => state.user.isUser);

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
    if (isUser) {
      navigate("/");
    }
  }, [isUser, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const postData = { ...formData };
    const endpoint = isSignUpMode ? "/user/signup" : "/user/signin";

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ROUTE}${endpoint}`,
        postData
      );
      dispatch(fetchQuizzes(response.data.token));
      dispatch(userActions.setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully");
      if (response.data.user.email === process.env.REACT_APP_ADMIN_EMAIL) {
        dispatch(userActions.setIsAdmin(true));
      } else {
        dispatch(userActions.setIsUser(false));
      }
      window.location.reload();
    } catch (error) {
      const errorMessage =
        error?.response?.data.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoding ? (
        <div
          style={{ minHeight: "100vh", flexDirection: "column" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="mt-3">Please Wait ....</h5>
        </div>
      ) : (
        <div className={`container-y ${isSignUpMode ? "sign-up-mode" : ""}`}>
          <div className="forms-container">
            <div className="signin-signup">
              <form
                action="#"
                className="sign-in-form"
                onSubmit={handleFormSubmit}
              >
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                <i class="bi bi-envelope-arrow-up-fill"></i>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                <i class="bi bi-unlock-fill"></i>
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <input
                  required
                  type="submit"
                  value="Login"
                  className="btn-y solid"
                />
              </form>
              <form
                action="#"
                className="sign-up-form"
                onSubmit={handleFormSubmit}
              >
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                <i class="bi bi-person"></i>
                  <input
                    required
                    type="text"
                    placeholder="Username"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                <i class="bi bi-envelope-arrow-up-fill"></i>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                <i class="bi bi-unlock-fill"></i>
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <input type="submit" className="btn-y" value="Sign up" />
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here ?</h3>
                <p>
                  Don't have an account.click her to create an account to enjoy
                  our services.
                </p>
                <button
                  className="btn-y transparent"
                  id="sign-up-btn"
                  onClick={toggleMode}
                >
                  Sign Up
                </button>
              </div>
              <img src={Register} className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us ?</h3>
                <p>
                  Already have an account.Click her to sign in that account and
                  enjoy our services
                </p>
                <button
                  className="btn-y transparent"
                  id="sign-in-btn"
                  onClick={toggleMode}
                >
                  Sign in
                </button>
              </div>
              <img src={Login} className="image" alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
