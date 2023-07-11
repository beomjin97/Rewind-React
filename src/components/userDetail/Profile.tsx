import { useRecoilValue } from "recoil";
import { userState } from "../../store";
import { userType } from "../../types/user";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { followUser } from "../../api";
import { MdOutlineSettings } from "react-icons/md";
import Modal from "../common/Modal";
interface Props {
  name: string;
  postNum: number;
  followers: { name: string; _id: string }[];
  followerNum: number;
  followingNum: number;
}

const Profile = ({
  name,
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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
    <>
      {isModalVisible && (
        <Modal onClose={() => setIsModalVisible(false)}>
          <form className="w-[300px] h-[100px] flex flex-col items-center justify-center">
            <div>비밀번호 재확인이 필요합니다.</div>
            <input type="password" className="w-40 border-2" id="pw" />
            <button type="submit" className="block">
              확인
            </button>
          </form>
        </Modal>
      )}
      <div className="md:block flex w-[40%] my-10 mx-auto justify-between items-center">
        <div className="text-center">
          <div className="h-[150px] w-[150px] relative rounded-[50%] bg-primary mx-auto">
            <MdOutlineSettings
              className="absolute text-xl cursor-pointer bottom-1 right-1"
              onClick={() => {
                setIsModalVisible(true);
              }}
            />
          </div>
          <div className="text-[#00000080]">{name}</div>
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
    </>
  );
};

export default Profile;
