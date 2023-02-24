import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useRecoilState } from "recoil";
import { userType } from "../../type";
import { userState } from "../../store";
import { logIn } from "../../api";

const Signin = () => {
  const inputStyle =
    "w-[76%] h-[40px] mx-auto mb-5 block bg-[#DEDEDE] border-2 border-[#00000030] rounded pl-4 focus:outline-primary focus:bg-[#fff]";
  const [userDataIsEmpty, setUserDataIsEmpty] = useState<boolean>(true);
  const [userFormData, setUserFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [visiblePW, setVisiblePW] = useState<boolean>(false);
  const [userData, setUserData] = useRecoilState<userType>(userState);

  const navigate = useNavigate();

  useEffect(() => {
    if (userFormData.email !== "" && userFormData.password !== "") {
      setUserDataIsEmpty(false);
    } else {
      setUserDataIsEmpty(true);
    }
  }, [userFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await logIn(userFormData);
      localStorage.setItem("token", res.data.token);
      const { userName, _id } = jwtDecode<userType>(res.data.token);
      setUserData({ userName, _id });
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={signIn}>
      <input
        name="email"
        type="email"
        placeholder="사용자 이메일"
        className={inputStyle}
        onChange={handleChange}
      />
      <input
        name="password"
        type={visiblePW ? "text" : "password"}
        placeholder="비밀번호"
        className={inputStyle}
        onChange={handleChange}
      />
      {visiblePW ? (
        <AiFillEye
          className="block absolute right-[15%] top-[280px] cursor-pointer text-lg"
          onClick={() => setVisiblePW(false)}
        />
      ) : (
        <AiFillEyeInvisible
          className="block absolute right-[15%] top-[280px] cursor-pointer text-lg"
          onClick={() => setVisiblePW(true)}
        />
      )}
      <button
        className={`w-[76%] h-[40px] block mx-auto rounded font-bold text-white ${
          userDataIsEmpty ? "bg-[#DEDEDE]" : "bg-primary"
        }`}
        type="submit"
        disabled={userDataIsEmpty}
      >
        로그인
      </button>
    </form>
  );
};

export default Signin;
