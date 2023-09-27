import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";
import { Sign, Home, NoPage, Admin, CreateQuiz } from "./pages";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { userActions } from "./store/userSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      const base_url = process.env.REACT_APP_SERVER_ROUTE;
      try {
        const { data } = await axios.get(`${base_url}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(userActions.setUser(data));
        if (data.user.name === process.env.REACT_APP_ADMIN) {
          dispatch(userActions.setIsAdmin(true));
          navigate("/admin");
        } else {
          dispatch(userActions.setIsUser(true));
        }
      } catch (error) {
        console.log(error);
        alert(error?.response?.data || error.message);
      }
    };
    if (token) {
      fetchUser();
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/quiz/new" element={<CreateQuiz />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
