import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

import ProfileMenu from "./ProfileMenu";

interface props {
  inHeader: boolean;
  userName: string;
  _id: string;
}

const Profile = ({ inHeader, userName, _id }: props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div
      className={`${
        inHeader ? "flex-row-reverse items-center" : ""
      } w-[170px] flex mb-1 cursor-pointer relative`}
    >
      {inHeader ? (
        <>
          <IoIosArrowDown
            className={`text-primary text-2xl ${isOpen && "rotate-180"}`}
            onClick={() => {
              if (setIsOpen) {
                setIsOpen((prev) => !prev);
              }
            }}
          />
          <div
            className="max-w-[130px] font-bold text-lg leading-10 truncate"
            onClick={() => navigate(`/user/${_id}`)}
          >
            {userName}
          </div>
          <div
            className="w-[40px] h-[40px] rounded-[20px] bg-primary mr-1 "
            onClick={() => navigate(`/user/${_id}`)}
          ></div>
        </>
      ) : (
        <>
          <div
            className="w-[40px] h-[40px] rounded-[20px] bg-primary mr-1 "
            onClick={() => navigate(`/user/${_id}`)}
          ></div>
          <div
            className="max-w-[130px] font-bold text-lg leading-10 truncate right-0"
            onClick={() => navigate(`/user/${_id}`)}
          >
            {userName}
          </div>
        </>
      )}
      {isOpen && <ProfileMenu _id={_id} userName={userName} />}
    </div>
  );
};

export default Profile;
