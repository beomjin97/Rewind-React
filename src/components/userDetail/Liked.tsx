import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  likes: { _id: string; imgUrl: string[] }[] | undefined;
}

const Liked = ({ likes }: Props) => {
  const navigate = useNavigate();

  return likes ? (
    <div className="flex md:w-[90vw] md:h-auto w-[900px] h-[350px] flex-wrap mx-auto overflow-auto scrollbar-hide">
      {likes.map((item, idx) => (
        <div
          key={idx}
          className="md:w-[120px] md:h-[120px] w-[150px] h-[150px] bg-[#00000030] m-5 overflow-hidden cursor-pointer"
          onClick={() => navigate(`/post/${item._id}`)}
        >
          <img src={item.imgUrl[0]} alt="test" />
        </div>
      ))}
    </div>
  ) : (
    <div className="">No Post not yet</div>
  );
};

export default Liked;
