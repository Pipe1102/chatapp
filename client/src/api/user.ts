import { jwtDecode } from "jwt-decode";
import { basicAxios } from ".";
import { User } from "../types";

export interface RegisterUser {
  username: string;
  password: string;
  imgUrl?: string;
}
export const register = async (data: RegisterUser) => {
  const response = await basicAxios.post("/user/register", data);
  return response;
};

export const login = async (data: RegisterUser) => {
  const response = await basicAxios.post("/user/login", data);
  return response;
};

export const logout = () => {
  localStorage.removeItem("token");
};

interface JwtPayload {
  id: string;
  exp: number;
  iat: number;
}

export const getUser = async (): Promise<User> => {
  const token: JwtPayload = jwtDecode(localStorage.getItem("token")!);
  const response = await basicAxios.get(`/user/${token.id}`);
  return response.data;
};

export const getUserId = () => {
  const token: JwtPayload = jwtDecode(localStorage.getItem("token")!);
  return token.id;
};

export const getUserInConversation = (users: User[]) => {
  const userId = getUserId();
  const temp = users.filter((el: User) => el.id !== userId);
  const user: User = temp[0];
  return user;
};
