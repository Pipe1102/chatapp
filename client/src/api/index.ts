import axios from "axios";
import { logout } from "./user";

export const basicAxios = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json",
  },
});
const authAxios = axios.create({
  baseURL: "http://localhost:5000",
});
authAxios.interceptors.request.use(
  (config: any) => {
    if (config.authorization !== false) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.status === 403) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default authAxios;
