import axios from "axios";

// 백엔드 API 서버 기본 설정
const api = axios.create({
  baseURL: "http://localhost:8081", // 백엔드 포트
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
