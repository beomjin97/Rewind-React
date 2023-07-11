import { AxiosInstance } from "axios";

export class PostService {
  constructor(private api: AxiosInstance) {}

  async getPostList(page: number) {
    try {
      const res = await this.api.get(`/api/post/?page=${page}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createPost(newPost: any) {
    try {
      await this.api.get("/api/post", newPost);
    } catch (error) {
      console.log(error);
    }
  }

  async likePost(postId: string) {
    try {
      await this.api.post(`/api/post/${postId}/like`);
    } catch (error) {
      console.log(error);
    }
  }

  async getPostById(postId: string) {
    try {
      const res = await this.api.get(`/api/post/${postId}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
