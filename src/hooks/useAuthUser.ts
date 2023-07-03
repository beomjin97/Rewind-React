import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { DecodedJWT, userType } from "../types/user";
import { userState } from "../store";

const useAuthUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const setUserData = useSetRecoilState<userType>(userState);

  useEffect(() => {
    if (token) {
      const decodedData: DecodedJWT = jwtDecode(token);
      if (decodedData.exp * 1000 <= Date.now()) {
        localStorage.removeItem("token");
        navigate("/auth");
      } else {
        setUserData({ userName: decodedData.userName, _id: decodedData._id });
      }
    } else {
      navigate("/auth");
    }
  }, []);
};

export default useAuthUser;
