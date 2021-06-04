import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const httpClient = axios.create({
  withCredentials: false,
});

httpClient.interceptors.request.use((config) => {
  /* istanbul ignore if */
  if (process.env.REACT_APP_AUTH) {
    const accessToken = localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_NAME ?? "AUTH_TOKEN");
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { httpClient };
