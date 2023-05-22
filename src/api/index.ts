import axios from "axios";
import { signInformData, singUpformData } from "../type";
const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_DOMAIN_NAME });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token") && req.headers) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export const createPost = (newPost: any) => API.post("/api/post", newPost);
export const getPost = (page: number) => API.get(`/api/post/?page=${page}`);
export const deletePost = (postId: string) => API.delete(`/api/post/${postId}`);
export const editPost = (postId: string, payload: any) =>
  API.patch(`/api/post/${postId}`, payload);
export const likePost = (postId: string) =>
  API.post(`/api/post/${postId}/like`);
export const getPostById = (postId: string) => API.get(`/api/post/${postId}`);
export const getPostByTag = (tag: string) => API.get(`/api/post/?tag=${tag}`);
export const getTags = () => API.get("/api/post/tags");

export const createComment = (comment: string, postId: string) =>
  API.post(`/api/post/${postId}/comment`, { comment });

export const getUserById = (userId: string) => API.get(`/api/user/${userId}`);
export const followUser = (followingId: string) =>
  API.post(`/api/user/follow/${followingId}`);
export const searchUser = (userName: string) =>
  API.get(`/api/search?user=${userName}`);

export const verifyUser = () => API.post("/api/verify");
export const register = (formData: singUpformData) =>
  API.post("/api/auth/signIn", formData);
export const logIn = (formdata: signInformData) =>
  API.post("/api/auth/signIn", formdata);
