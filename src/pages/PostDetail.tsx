import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createComment, getPostById, deletePost } from "../api";
import { PostType } from "../types/post";
import { MdOutlineCancel } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useRecoilValue } from "recoil";

import Profile from "../components/common/Profile";
import { userState } from "../store";
import Like from "../components/postDetail/Like";
import { IoMdSend } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const PostDetail = () => {
  //@ts-ignore
  const [post, setPost] = useState<PostType>({});
  const [comment, setComment] = useState<string>("");
  const user = useRecoilValue(userState);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId || "")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, [postId]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createComment(comment, post._id)
      .then(() => {
        alert("등록되었습니다.");
        setComment("");
        window.location.reload();
      })
      .catch((err: any) => {
        alert(err.response.data.message);
        navigate("/auth");
      });
  };

  const deleteMyPost = async () => {
    if (window.confirm("해당 게시물을 삭제할까요?")) {
      try {
        const res = await deletePost(postId || "");
        alert(res.data.message);
        navigate("/");
      } catch (err: any) {
        alert(err.response.data.message);
        navigate("/auth");
      }
    }
  };

  const editMyPost = async () => {
    if (window.confirm("해당 게시물을 수정할까요?")) {
      navigate(`/update/${postId}`);
    }
  };

  return post.content ? (
    <div className="w-full flex md:block h-[100vh]">
      <div className="bg-[#101010] w-[55%] flex items-center md:w-full">
        <MdOutlineCancel
          className="absolute text-5xl cursor-pointer text-primary left-5 top-5"
          onClick={() => navigate(-1)}
        />
        <div className="w-[100%] md:h-auto h-[660px] bg-[#D9D9D9] overflow-hidden flex justify-center">
          <Swiper navigation={true} modules={[Navigation]}>
            {post.imgUrl?.map((i) => (
              <SwiperSlide>
                <img
                  src={i ? i : ""}
                  alt=""
                  className="h-[100%] object-scale-down my-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="bg-[#f2f2f2] w-[45%] md:w-full p-10 md:p-5">
        <div className="flex justify-between ">
          <Profile
            inHeader={false}
            name={post.author.name}
            _id={post.author._id}
          />
          <span className="text-md">{moment(post.createdAt).fromNow()}</span>
        </div>
        <div className="w-full h-[50%] border-b-[1px] border-[#00000030] relative ">
          <div className="mt-10 text-2xl">{post.content}</div>
          <div className="my-10 text-2xl">
            {post.tags?.map((item) => (
              <span className="cursor-pointer hover:underline">{`#${item} `}</span>
            ))}
          </div>
          <div className="absolute flex justify-between w-full bottom-2 md:relative">
            <Like
              postId={post._id}
              like={post.like?.includes(user._id)}
              likeNum={post.like?.length}
            />
            {user._id === post.author._id && (
              <div className="flex mt-2">
                <RiDeleteBin5Line
                  className="mr-2 text-4xl cursor-pointer hover:text-primary"
                  onClick={deleteMyPost}
                />
                <BiEdit
                  className="text-4xl cursor-pointer hover:text-primary"
                  onClick={editMyPost}
                />
              </div>
            )}
          </div>
        </div>
        <div className="relative mt-4">
          <form onSubmit={handleSubmit}>
            <span className="mr-2 text-xl font-bold sm:hidden">
              {user.name}
            </span>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력해보세요"
              className="pl-2 py-1 text-xl focus:outline-primary sm:w-[90%] w-[70%]"
            />
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="absolute bottom-0 ml-2 text-4xl text-primary"
            >
              <IoMdSend />
            </button>
          </form>
        </div>
        <div className="overflow-y-auto h-80 scrollbar-hide">
          {post.comment &&
            post.comment.map((item) => (
              <div className="mt-5" key={item._id}>
                <span
                  className="mr-4 text-xl font-bold cursor-pointer"
                  onClick={() => navigate(`/user/${item.author._id}`)}
                >
                  {item.author.name}
                </span>
                <span className="text-xl">{item.content}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default PostDetail;
