import { useState } from "react";
import Footer from "../components/common/Footer";

import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";

const Auth = () => {
  const [account, setAccount] = useState<boolean>(true);
  return (
    <div className="bg-[#DEDEDE] flex justify-center items-center h-[100vh] min-h-[700px]">
      <div className="lg:w-[100vw] w-[22%] min-w-[280px] lg:h-[100vh] min-h-[700px] h-[80%] bg-[#FAFAFA] border-2 border-[#00000030] relative ">
        <h1 className="my-20 text-5xl font-bold text-center">Rewind</h1>
        {account ? <Signin /> : <Signup />}
        <div className="w-[76%] h-[1px] bg-[#000] mx-auto my-10" />
        <div className="text-center">
          Rewind 계정이 {account ? "없으시다면" : "있으시다면"}, &nbsp;
          <span
            className="underline cursor-pointer text-primary"
            onClick={() => setAccount((prev) => !prev)}
          >
            {account ? "회원가입" : "로그인"}
          </span>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
