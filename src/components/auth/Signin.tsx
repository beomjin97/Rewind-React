import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useSetRecoilState } from "recoil";
import { userType } from "../../type";
import { userState } from "../../store";
import { logIn } from "../../api";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Signin = () => {
  const inputStyle =
    "w-[76%] h-[40px] mx-auto mb-5 block bg-[#DEDEDE] border-2 border-[#00000030] rounded pl-4 focus:outline-primary focus:bg-[#fff]";

  const [visiblePW, setVisiblePW] = useState<boolean>(false);
  const setUserData = useSetRecoilState<userType>(userState);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    try {
      const res = await logIn(formData);
      localStorage.setItem("token", res.data.token);
      const { userName, _id } = jwtDecode<userType>(res.data.token);
      setUserData({ userName, _id });
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="사용자 이메일"
        className={inputStyle}
        {...register("email")}
      />
      <input
        type={visiblePW ? "text" : "password"}
        placeholder="비밀번호"
        className={inputStyle}
        {...register("password")}
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
        className="w-[76%] h-[40px]  block mx-auto rounded font-bold text-white bg-primary"
        type="submit"
      >
        로그인
      </button>
    </form>
  );
};

export default Signin;
