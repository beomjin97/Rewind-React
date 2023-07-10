import { AxiosInstance } from "axios";
import { SignInformData, SignUpformData, userType } from "../types/user";
import { StorageService } from "./storageService";
import jwtDecode from "jwt-decode";

export class AuthService {
  constructor(
    private api: AxiosInstance,
    private storageService: StorageService
  ) {}

  getUserfromToken() {
    const token = this.storageService.getAccessToken();
    if (token) {
      return jwtDecode<userType>(token);
    } else {
      return null;
    }
  }

  async signin(formdata: SignInformData) {
    try {
      const response = await this.api.post("/api/auth/signIn", formdata);
      this.storageService.setAccessToken(response.data.token);
      return this.getUserfromToken();
    } catch (error) {
      console.log(error);
    }
  }

  async signup(formdata: SignUpformData) {
    try {
      await this.api.post("/api/auth/signUp", formdata);
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.storageService.removeAccessToken();
  }
}
