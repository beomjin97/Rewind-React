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
    <div className="flex h-[100vh] justify-center items-center">
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        오픈
      </button>
      <Dialog open={isOpen}>
        <form onSubmit={submit}>
          <Stack spacing={2} className="m-5">
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
        </form>
      </Dialog>
    </div>
  );
};

export default AuthModal;
