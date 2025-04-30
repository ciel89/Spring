import React, { useState } from 'react';
import axios from 'axios';
import '../css/Register.css';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    address: ''
  });
  const [isAvailable, setIsAvailable] = useState(null); // 중복 결과 상태

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'username') setIsAvailable(null); // username 변경 시 상태 초기화
  };

  const checkUsername = () => {
    if (!form.username) return alert('아이디를 입력하세요');

    axios.get(`http://localhost:8080/api/users/check-username?username=${form.username}`)
      .then((res) => {
        if (res.data.available) {
          alert('사용 가능한 아이디입니다.');
          setIsAvailable(true);
        } else {
          alert('이미 사용 중인 아이디입니다.');
          setIsAvailable(false);
        }
      })
      .catch(() => alert('중복 확인 중 오류 발생'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAvailable !== true) {
      alert('아이디 중복 확인이 필요합니다.');
      return;
    }

    axios.post('http://localhost:8080/api/users/register', form)
      .then(() => {
        alert('회원가입 완료!');
        setForm({ username: '', password: '', email: '', address: '' });
        setIsAvailable(null);
      })
      .catch(() => alert('회원가입 실패'));
  };

  return (
    <div className="register-wrapper">
      <h2>회원가입</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="username-row">
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={checkUsername}>중복확인</button>
        </div>
        {isAvailable === false && <p className="error">❌ 이미 사용 중인 아이디입니다.</p>}
        {isAvailable === true && <p className="success">✅ 사용 가능한 아이디입니다.</p>}

        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="주소"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
