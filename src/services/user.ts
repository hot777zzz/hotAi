import { HttpService } from "./http";
import { AxiosError } from "axios";

interface LoginResponse {
  token: string;
  userId: number;
}

interface LoginRequest {
  username: string;
  password: string;
}

export class UserService {
  static async login(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    try {
      const response = await HttpService.post<LoginResponse>(
        "/user/login",
        { username, password } as LoginRequest,
        { requiresAuth: false }
      );

      this.setUserAuth(response.token, response.userId);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "登录失败");
      }
      throw new Error("登录失败");
    }
  }

  static setUserAuth(token: string, userId: number) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId.toString());
    document.cookie = `token=${token}; path=/;`;
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}
