import { useNavigate } from "react-router-dom";

interface Props {
  _id: string;
  name: string;
}

const ProfileMenu = ({ _id, name }: Props) => {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const commonSyle = "py-1 pl-1 hover:bg-[#00000030]";
  return (
    <div className="absolute right-0 top-9 border-[1px] border-[#00000030] bg-white w-32">
      <div className="py-1 pl-1 break-words cursor-default">{name}</div>
      <div className={commonSyle} onClick={() => navigate(`/user/${_id}`)}>
        프로필
      </div>
      <div className={commonSyle}>환경설정</div>
      <div
        className={`${commonSyle} border-t-[1px] border-[#00000030]`}
        onClick={signOut}
      >
        로그아웃
      </div>
    </div>
  );
};

export default ProfileMenu;
