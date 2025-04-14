// src/api.js
import axios from "axios";

// 백엔드 API 기본 URL 설정 (Spring Boot 서버 주소)
const api = axios.create({
  baseURL: "http://localhost:8082/api", // 개발 환경용
});

export default api;

