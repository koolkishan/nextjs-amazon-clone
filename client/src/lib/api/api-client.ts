import axios from "axios";

const apiUrl = "http://localhost:3000";
const jwtKey = "accessToken";

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const accessToken = localStorage.getItem(jwtKey);
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createUrl = (endpoint) => new URL(endpoint, apiUrl).href;
export const isStoredJwt = () => Boolean(localStorage.getItem(jwtKey));
export const setStoredJwt = (accessToken) =>
  localStorage.setItem(jwtKey, accessToken);

export const get = axios.get;
export const patch = axios.patch;
export const post = axios.post;
