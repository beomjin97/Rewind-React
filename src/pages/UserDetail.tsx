import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api";
import Profile from "../components/userDetail/Profile";
import Menu from "../components/userDetail/Menu";
import Post from "../components/userDetail/Posts";
import Liked from "../components/userDetail/Liked";
import Followers from "../components/userDetail/Followers";
import Following from "../components/userDetail/Following";

export interface userData {
  name: string;
  posts: { _id: string; imgUrl: string[] }[];
  likes: { _id: string; imgUrl: string[] }[];
  following: { name: string; _id: string }[];
  followedBy: { name: string; _id: string }[];
}

const UserDetail = () => {
  const [menu, setMenu] = useState<string>("post");
  const [userData, setUserData] = useState<userData | null>();
  const { userId } = useParams();

  useEffect(() => {
    getUserById(userId || "")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
        setUserData(null);
      });
  }, [userId]);

  if (userData === null) return <div>존재하지 않는 사용자입니다.</div>;

  return (
    <>
      <Profile
        name={userData?.name || ""}
        postNum={userData?.posts?.length || 0}
        followers={userData?.followedBy || []}
        followerNum={userData?.followedBy?.length || 0}
        followingNum={userData?.following?.length || 0}
      />
      <Menu menu={menu} setMenu={setMenu} />
      {menu === "post" && <Post posts={userData?.posts} />}
      {menu === "liked" && <Liked likes={userData?.likes} />}
      {menu === "followers" && (
        <Followers followers={userData?.followedBy || []} />
      )}
      {menu === "following" && (
        <Following following={userData?.following || []} />
      )}
    </>
  );
};

export default UserDetail;
