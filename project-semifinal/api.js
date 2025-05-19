import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,  // 세션 기반 인증 시 필요
});

export default api;
