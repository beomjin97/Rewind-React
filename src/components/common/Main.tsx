import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import useAuthUser from "../../hooks/useAuthUser";

const Main = () => {
  useAuthUser();
  return (
    <div className="bg-[#f2f2f2] h-[100vh]">
      <div className="w-[100vw] mx-auto max-w-[1400px] px-3">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
