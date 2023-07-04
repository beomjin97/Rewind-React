import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import Profile from "./Profile";
import { userType } from "../../types/user";
import { userState } from "../../store";
import { searchUser } from "../../api";

const Header = () => {
  const [userData, setUserData] = useRecoilState<userType>(userState);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const search = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.startsWith("#")) {
      navigate(`/?tag=${searchTerm.slice(1)}`);
    } else {
      try {
        const res = await searchUser(searchTerm);
        navigate(`/user/${res.data.userId}`);
      } catch (error) {
        navigate("/user/NotFound");
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-between w-[100%] lg:h-12 h-[120px] items-center border-b-[1px] border-[#00000030] min-w-[310px] relative">
      <a href="/" className="lg:text-4xl text-5xl font-bold w-[170px]">
        Rewind
      </a>
      <div className="relative block sm:hidden">
        <form onSubmit={search}>
          <input
            type="text"
            className="w-[24vw] h-[40px] rounded-2xl pl-4 focus:outline-primary placeholder:lg:text-transparent placeholder:text-[#00000070]"
            placeholder="사용자 또는 #태그 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <BiSearch className="absolute text-2xl cursor-pointer right-2 top-2 text-primary" />
          </button>
        </form>
      </div>
      <Profile
        inHeader={true}
        userName={userData.userName}
        _id={userData._id}
      />
    </div>
  );
};

export default Header;
