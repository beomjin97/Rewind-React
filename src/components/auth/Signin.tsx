import { TextField } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import AuthModal from "./AuthModal";
import { SignInformData } from "../../types/user";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  submit: (formdata: SignInformData) => Promise<void>;
}

const Signin: FC<Props> = ({ isOpen, setIsOpen, submit }) => {
  const { register, handleSubmit } = useForm<SignInformData>();
  const onSubmit = async (formData: SignInformData) => {
    try {
      await submit(formData);
      setIsOpen(false);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <AuthModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      role="로그인"
      submit={handleSubmit(onSubmit)}
    >
      <TextField
        label="계정"
        helperText="이메일을 입력해주세요"
        type="email"
        required
        {...register("email", { required: true })}
      />
      <TextField
        label="비밀번호"
        helperText="이메일을 입력해주세요"
        type="password"
        required
        {...register("password", { required: true })}
      />
    </AuthModal>
  );
};

export default Signin;
