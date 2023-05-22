import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useRecoilState } from "recoil";
import "swiper/css/bundle";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Upload from "./pages/Upload";
import UserDetail from "./pages/UserDetail";
import Main from "./components/common/Main";

import { userState } from "../src/store";
import { userType } from "../src/type";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useRecoilState<userType>(userState);

  useEffect(() => {
    if (token) {
      const decodedData: {
        userName: string;
        _id: string;
        iat: number;
        exp: number;
      } = jwtDecode(token);
      if (decodedData.exp * 1000 <= Date.now()) {
        localStorage.removeItem("token");
        navigate("/auth");
      } else {
        setUserData({ userName: decodedData.userName, _id: decodedData._id });
      }
    } else {
      navigate("/auth");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="user/:userId" element={<UserDetail />} />
        <Route path="upload" element={<Upload />} />
        <Route path="update/:postId" element={<Upload />} />
      </Route>
      <Route path="auth" element={<Auth />} />
      <Route path="post/:postId" element={<PostDetail />} />
    </Routes>
  );
}

export default App;
