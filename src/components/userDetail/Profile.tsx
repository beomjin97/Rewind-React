import { useRecoilValue } from "recoil";
import { userState } from "../../store";
import { userType } from "../../type";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { followUser } from "../../api";

interface Props {
  name: string;
  userName: string;
  postNum: number;
  followers: { userName: string; _id: string }[];
  followerNum: number;
  followingNum: number;
}

const Profile = ({
  name,
  userName,
  postNum,
  followers,
  followerNum,
  followingNum,
}: Props) => {
  const { _id } = useRecoilValue<userType>(userState);
  const { userId } = useParams();
  const ownPage: boolean = _id === userId;
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    setIsFollowing(followers.filter((user) => user._id === _id).length > 0);
  }, [followers, userId, _id]);

  const handleClick = async () => {
    try {
      const res = await followUser(userId || "");
      alert(res.data.message);
      setIsFollowing((prev) => !prev);
    } catch (error: any) {
      alert(error.response.data.message);
      navigate("/auth");
    }
  };

  return (
    <div className="md:block flex w-[40%] my-10 mx-auto justify-between items-center">
      <div className="text-center">
        <div className="h-[150px] w-[150px] rounded-[50%] bg-primary mx-auto"></div>
        <div className="text-[#00000080]">{name}</div>
        <div className="text-4xl font-thin">{userName}</div>
      </div>
      <div className="md:hidden w-[1px] h-[200px] border-[1px] border-[#00000050]"></div>
      <div className="w-[150px] md:mx-auto">
        <div className="flex justify-between my-6 text-xl">
          <span>posts</span>
          <span>{postNum}</span>
        </div>
        <div className="flex justify-between my-6 text-xl">
          <span>followers</span>
          <span>{followerNum}</span>
        </div>
        <div className="flex justify-between my-6 text-xl">
          <span>followings</span>
          <span>{followingNum}</span>
        </div>
        {!ownPage && (
          <button
            className="w-full py-[2px] text-xl hover:bg-primary border-[1px] duration-100"
            onClick={handleClick}
          >
            {isFollowing ? "unfollow" : "follow"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
