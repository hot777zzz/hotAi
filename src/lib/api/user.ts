import request from "../request";

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  password: string;
}

export const login = (data: LoginParams) => {
  return request.post("/user/login", data);
};

export const register = (data: RegisterParams) => {
  return request.post("/user/register", data);
};

export const getUserInfo = () => {
  return request.get("/user/profile");
};
