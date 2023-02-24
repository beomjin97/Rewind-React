import React, { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { register } from "../../api";

const Signup = () => {
  const inputStyle =
    "w-[76%] h-[40px] mx-auto mb-5 block bg-[#DEDEDE] border-2 border-[#00000030] rounded pl-4 focus:outline-primary focus:bg-[#fff]";

  const [visiblePW, setVisiblePW] = useState<boolean>(false);
  const [visiblePWC, setVisiblePWC] = useState<boolean>(false);
  const [userDataIsEmpty, setUserDataIsEmpty] = useState<boolean>(true);

  const [userData, setUserData] = useState<{
    name: string;
    userName: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }>({
    name: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    if (
      userData.email !== "" &&
      userData.name !== "" &&
      userData.password !== "" &&
      userData.passwordConfirm !== "" &&
      userData.userName !== ""
    ) {
      setUserDataIsEmpty(false);
    } else {
      setUserDataIsEmpty(true);
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signUp = async (e: any) => {
    e.preventDefault();
    try {
      const res = await register(userData);
      alert(res.data.message);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={signUp}>
      <input
        name="name"
        type="text"
        placeholder="이름"
        className={inputStyle}
        onChange={handleChange}
      />
      <input
        name="userName"
        type="text"
        placeholder="사용자 이름"
        className={inputStyle}
        onChange={handleChange}
      />
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
          className="block absolute right-[15%] top-[400px] cursor-pointer text-lg"
          onClick={() => setVisiblePW(false)}
        />
      ) : (
        <AiFillEyeInvisible
          className="block absolute right-[15%] top-[400px] cursor-pointer text-lg"
          onClick={() => setVisiblePW(true)}
        />
      )}
      <input
        name="passwordConfirm"
        type={visiblePWC ? "text" : "password"}
        placeholder="비밀번호 확인"
        className={inputStyle}
        onChange={handleChange}
      />
      {visiblePWC ? (
        <AiFillEye
          className="absolute right-[15%] top-[460px] cursor-pointer text-lg"
          onClick={() => setVisiblePWC(false)}
        />
      ) : (
        <AiFillEyeInvisible
          className="absolute right-[15%] top-[460px] cursor-pointer text-lg"
          onClick={() => setVisiblePWC(true)}
        />
      )}
      <button
        className={`w-[76%] h-[40px]  block mx-auto rounded font-bold text-white ${
          userDataIsEmpty ? "bg-[#DEDEDE]" : "bg-primary"
        }`}
        onClick={signUp}
        disabled={userDataIsEmpty}
      >
        회원가입
      </button>
    </form>
  );
};

export default Signup;
