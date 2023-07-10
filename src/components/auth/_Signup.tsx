import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { signUp } from "../../api";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const Signup = () => {
  const inputStyle =
    "w-[76%] h-[40px] mx-auto mb-5 block bg-[#DEDEDE] border-2 border-[#00000030] rounded pl-4 focus:outline-primary focus:bg-[#fff]";

  const [visiblePW, setVisiblePW] = useState<boolean>(false);
  const [visiblePWC, setVisiblePWC] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    try {
      const res = await signUp(formData);
      alert(res.data.message);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="이름"
        className={inputStyle}
        {...register("name", { required: true })}
      />
      <input
        type="text"
        placeholder="사용자 이름"
        className={inputStyle}
        {...register("userName", { required: true })}
      />
      <input
        type="email"
        placeholder="사용자 이메일"
        className={inputStyle}
        {...register("email", { required: true })}
      />
      <input
        type={visiblePW ? "text" : "password"}
        placeholder="비밀번호"
        className={inputStyle}
        {...register("password", { required: true })}
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
        type={visiblePWC ? "text" : "password"}
        placeholder="비밀번호 확인"
        className={inputStyle}
        {...register("passwordConfirm", { required: true })}
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
        className="w-[76%] h-[40px]  block mx-auto rounded font-bold text-white bg-primary"
        type="submit"
      >
        회원가입
      </button>
    </form>
  );
};

export default Signup;
