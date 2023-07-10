import { TextField } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import AuthModal from "./AuthModal";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Auth2: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
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
  );
};

export default Auth2;
