import useAuthStore from "@/utils/useAuthStore";
import axios from "axios";

// 401 에러 처리를 위한 함수
const handleUnauthorized = () => {
  // 토큰 제거
  useAuthStore.getState().logout();
  
  // 현재 페이지가 로그인 페이지가 아닌 경우에만 리다이렉트
  if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
    window.location.href = '/login';
  }
};

const httpInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

httpInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

httpInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // 401 Unauthorized 에러 처리
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default httpInstance;
