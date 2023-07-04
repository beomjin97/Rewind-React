import { useState, useEffect, useRef } from "react";
import Menu from "../components/home/Menu";
import Post from "../components/home/Post";
import Sidebar from "../components/home/Sidebar";
import { getPost, getTags, getPostByTag } from "../api";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { throttle } from "throttle-debounce";

import { PostType } from "../types/post";

const Home = () => {
  const [postData, setPostData] = useState<PostType[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [srolled, setScrolled] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const tag = searchParams.get("tag");
    if (tag) {
      getPostByTag(tag).then((res) => {
        setPostData(res.data);
      });
    } else if (page > 1) {
      getPost(page).then((res) => {
        setPostData((prev) => [...prev, ...res.data]);
        setLoading(false);
      });
    } else {
      getPost(page).then((res) => {
        setPostData(res.data);
      });
    }
    getTags().then((res) => {
      setTags(res.data);
    });
  }, [searchParams, page]);

  useEffect(() => {
    if (isScrollBottom) {
      setPage((prev) => prev + 1);
      setLoading(true);
    }
  }, [isScrollBottom]);

  const handleScroll = throttle(1000, () => {
    if (listRef.current) {
      const { scrollHeight, offsetHeight, scrollTop } = listRef.current;
      setScrolled(scrollTop);
      const offset = 50;
      setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }
  });

  return (
    <div className="flex justify-between lg:justify-center">
      <Sidebar isVisible={isVisible} tags={tags} />
      <div>
        <Menu setIsVisible={setIsVisible} />
        <div
          className={`max-h-[calc(100vh-121px)] scrollbar-hide ${
            postData.length === 0 ? "overflow-y-hidden" : "overflow-y-auto"
          }`}
          ref={listRef}
          onScroll={handleScroll}
        >
          {postData.length === 0 ? (
            <div className="w-[calc(100vw-24px)] max-w-[660px] text-center h-[100vh]">
              <MdOutlineImageNotSupported className="mx-auto mt-20 text-primary text-9xl" />
              <p className="text-3xl font-thin">No Post not yet</p>
            </div>
          ) : (
            postData.map((post) => <Post post={post} key={post._id} />)
          )}
          {loading && <div className="text-lg text-center">loading</div>}
        </div>
      </div>
    </div>
  );
};

export default Home;
