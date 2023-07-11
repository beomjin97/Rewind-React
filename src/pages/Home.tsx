import { useState, useEffect, useRef } from "react";
import Menu from "../components/home/Menu";
import Post2 from "../components/home/Post2";
import Sidebar from "../components/home/Sidebar";
import { getPost, getTags, getPostByTag } from "../api";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { throttle } from "throttle-debounce";

import { PostType } from "../types/post";
import { usePost } from "../context/PostContext";
import { Fragment } from "react";
import Stack from "@mui/material/Stack";

const Home = () => {
  const PostConext = usePost();
  if (PostConext === null) {
    throw new Error("예상치 못한 에러가 발생했습니다.");
  }

  const { postList, error, fetchNextPage } = PostConext;
  console.log(postList);

  return (
    <div className="grid grid-cols-3 gap-4 border-2">
      <Stack position="sticky" className="border-2">
        123
      </Stack>
      <div className="h-[100vh] scrollbar-hide overflow-y-auto">
        <Stack spacing={6} className="items-center mt-2 border-2">
          {postList?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.map((post: any) => (
                <Post2 />
              ))}
            </Fragment>
          ))}
        </Stack>
      </div>
      <Stack className="border-2">123</Stack>
    </div>
  );
};

export default Home;
