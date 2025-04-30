// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/users/login', form, {
      withCredentials: true  // 세션 유지
    })
      .then((res) => {
        alert('로그인 성공!');
        window.location.href = '/'; // 또는 navigate('/')
      })
      .catch((err) => {
        console.error('로그인 실패:', err);
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      });
  };

  return (
    <div className="login-wrapper">
      <h2>로그인</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
