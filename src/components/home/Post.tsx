import { useState } from "react";
import { useRecoilValue } from "recoil";
import Profile from "../common/Profile";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { MdOutlineAddComment } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import moment from "moment";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { createComment, likePost } from "../../api";
import { PostType } from "../../types/post";
import { userState } from "../../store";

interface Props {
  post: PostType;
}

const Post = ({ post }: Props) => {
  const iconStyle = "text-primary text-3xl cursor-pointer";
  const [likeNum, setLikeNum] = useState<number>(post.like?.length || 0);
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const user = useRecoilValue(userState);
  const [like, setLike] = useState<boolean>(
    post.like?.includes(user._id) || false
  );

  const navigate = useNavigate();
  console.log(post.imgUrl);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    createComment(comment, post._id)
      .then(() => {
        alert("등록되었습니다.");
        setComment("");
      })
      .catch((err) => {
        alert(err.response.data.message);
        navigate("/auth");
      });
  };

  const handleLike = () => {
    setLike((prev) => !prev);
    setLikeNum((prev) => prev + 1);
    likePost(post._id)
      .then((res) => console.log(res.data.message))
      .catch((err) => {
        alert(err.response.data.message);
        navigate("/auth");
      });
  };

  const handleLikeCancel = () => {
    setLike((prev) => !prev);
    setLikeNum((prev) => prev - 1);
    likePost(post._id)
      .then((res) => console.log(res.data.message))
      .catch((err) => {
        alert(err.response.data.message);
        navigate("/auth");
      });
  };

  return (
    <div className="w-[calc(100vw-24px)] max-w-[660px] py-2 border-b-2 border-[#00000030] box-content">
      <Profile
        inHeader={false}
        userName={post.author.userName}
        _id={post.author._id}
      />
      {post.imgUrl && post.imgUrl.length > 0 && (
        <div className="w-[100%] h-[400px] bg-[#00000030] my-2 overflow-hidden cursor-pointer">
          <Swiper className="w-[100%] h-[100%]">
            {post.imgUrl.map((i) => (
              <SwiperSlide>
                <img
                  src={i}
                  alt=""
                  className="w-[100%] h-[100%] object-contain"
                  onClick={() => navigate(`/post/${post._id}`)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="flex justify-between my-2">
        <div className="flex">
          {like ? (
            <IoMdHeart className={iconStyle} onClick={handleLikeCancel} />
          ) : (
            <IoMdHeartEmpty className={iconStyle} onClick={handleLike} />
          )}
          <span className="mr-2">{likeNum}</span>
          <MdOutlineAddComment
            className={iconStyle}
            onClick={() => setIsInputActive((prev) => !prev)}
          />
        </div>
        <div className="text-[12px] leading-[30px]">
          {moment(post.createdAt).fromNow()}
        </div>
      </div>

      <div>{post.content}</div>
      <div>
        {post.tags?.map((tag) => (
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate(`/?tag=${tag}`)}
          >{`#${tag} `}</span>
        ))}
      </div>
      <div className="my-2">
        {post.comment && post.comment.length !== 0 && (
          <>
            <span
              className="mr-2 font-bold cursor-pointer"
              onClick={() =>
                navigate(`/user/${post.comment && post.comment[0].author._id}`)
              }
            >
              {post.comment[0].author.userName}
            </span>
            <span>{post.comment[0].content}</span>
          </>
        )}
      </div>
      {isInputActive && (
        <div className="relative">
          <form onSubmit={handleSubmit}>
            <span className="mr-2 font-bold">{user.userName}</span>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력해보세요"
              className="pl-2 focus:outline-primary w-[70%]"
            />
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="absolute bottom-0 ml-2 text-2xl text-primary"
            >
              <IoMdSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
