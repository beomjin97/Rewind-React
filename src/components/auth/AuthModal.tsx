import { Button, Dialog, Stack } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface Props {
  children: ReactNode;
  role: "로그인" | "회원가입";
  submit: () => Promise<void>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthModal = ({ children, role, submit, isOpen, setIsOpen }: Props) => {
  return (
    <Dialog open={isOpen}>
      <Stack spacing={2} className="m-5" component="form" onSubmit={submit}>
        <h1 className="text-2xl font-bold text-center">Rewind</h1>

        {children}
        <div className="flex justify-between">
          <Button
            variant="outlined"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            취소
          </Button>
          <Button variant="contained" type="submit">
            {role}
          </Button>
        </div>
      </Stack>
    </Dialog>
  );
};

export default AuthModal;
