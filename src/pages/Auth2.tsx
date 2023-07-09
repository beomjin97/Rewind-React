import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthModal from "./AuthModal";

const Auth2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        오픈
      </button>
      <AuthModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        role="로그인"
        submit={() => Promise.resolve()}
      >
        <TextField
          label="계정"
          helperText="이메일을 입력해주세요"
          type="email"
          required
        />
        <TextField
          label="비밀번호"
          helperText="이메일을 입력해주세요"
          type="password"
          required
        />
      </AuthModal>
    </div>
  );
};

export default Auth2;
