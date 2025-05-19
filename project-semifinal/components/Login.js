import React, { useState } from 'react';
import api from '../api';
import '../css/Login.css';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [findUsername, setFindUsername] = useState('');
  const [resetUsername, setResetUsername] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/users/login', form, {
      withCredentials: true
    })
      .then((res) => {
        const role = res.data.role;
        const userId = res.data.id; 

        alert('로그인 성공!');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);

        if (role === 'ADMIN') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/mypage';
        }
      })
      .catch((err) => {
        console.error('로그인 실패:', err);
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      });
  };

  // 아이디 존재 확인
  const handleCheckUsername = () => {
    if (!findUsername) {
      alert('아이디를 입력하세요.');
      return;
    }

    api.get(`/users/check-username?username=${findUsername}`)
      .then(() => {
        alert('존재하는 아이디입니다.');
      })
      .catch(() => {
        alert('존재하지 않는 아이디입니다.');
      });
  };

  // 임시 비밀번호 발송
  const handleResetPassword = () => {
    if (!resetUsername) {
      alert('아이디를 입력하세요.');
      return;
    }

    api.post('/users/reset-password-by-username', { username: resetUsername })
      .then(() => {
        alert('임시 비밀번호가 가입 시 등록한 이메일로 발송되었습니다.');
      })
      .catch(() => {
        alert('해당 아이디로 가입된 계정이 없습니다.');
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

      {/* 아이디 찾기 */}
      <div className="find-username">
        <h4>아이디 확인</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="아이디 입력"
            value={findUsername}
            onChange={(e) => setFindUsername(e.target.value)}
          />
          <button onClick={handleCheckUsername}>아이디 확인</button>
        </div>
      </div>

      {/* 비밀번호 재설정 */}
      <div className="reset-password">
        <h4>비밀번호 재설정</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="아이디 입력"
            value={resetUsername}
            onChange={(e) => setResetUsername(e.target.value)}
          />
          <button onClick={handleResetPassword}>임시 비밀번호 발송</button>
        </div>
      </div>
    </div>
  );
}
