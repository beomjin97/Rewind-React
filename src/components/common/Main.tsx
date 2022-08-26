import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Main = () => {
  return (
    <div className="bg-[#f2f2f2]">
      <div className="w-[100vw] mx-auto max-w-[1400px] px-3">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
