import axios from "axios";

const httpInstance = axios.create({
  // TODO - baseUrl 설정
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpInstance.interceptors.request.use(
  (config) => {
    // TODO 임시 토큰 처리
    const token = localStorage.getItem("toekn");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

httpInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  }
);

export default httpInstance;
