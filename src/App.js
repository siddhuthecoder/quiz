import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sign, Home, NoPage } from "./pages";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { userActions } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      const base_url = process.env.REACT_APP_SERVER_ROUTE;
      try {
        const { data } = await axios.get(`${base_url}user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        dispatch(userActions.setIsUser(true));
        dispatch(userActions.setUser(data));
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
