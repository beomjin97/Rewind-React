import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import Auth3 from "../auth/Signup";
import Auth2 from "../auth/Signin";

const AuthButtons = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSigninOpen, setIsSigninOpen] = useState(false);

  return (
    <>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
        color="inherit"
      >
        <Button
          onClick={() => {
            setIsSignupOpen(true);
          }}
        >
          회원가입
        </Button>
        <Button
          onClick={() => {
            setIsSigninOpen(true);
          }}
        >
          로그인
        </Button>
      </ButtonGroup>
      <Auth3 isOpen={isSignupOpen} setIsOpen={setIsSignupOpen} />
      <Auth2 isOpen={isSigninOpen} setIsOpen={setIsSigninOpen} />
    </>
  );
};

export default AuthButtons;
