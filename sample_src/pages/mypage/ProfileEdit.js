// src/pages/mypage/ProfileEdit.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileEdit.css';

export default function ProfileEdit() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    email: '',
    address: '',
    password: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/users/me', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setForm({
          email: res.data.email || '',
          address: res.data.address || '',
          password: ''
        });
      })
      .catch(() => alert('회원 정보를 불러올 수 없습니다.'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put('http://localhost:8080/api/users/update', form, { withCredentials: true })
      .then(() => alert('회원 정보가 수정되었습니다.'))
      .catch(() => alert('수정 실패. 다시 시도해주세요.'));
  };

  if (!user) return null;

  return (
    <div className="profile-wrapper">
      <h3>🧾 회원정보 수정</h3>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>아이디</label>
        <input type="text" value={user.username} disabled />

        <label>이메일</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />

        <label>주소</label>
        <input type="text" name="address" value={form.address} onChange={handleChange} />

        <label>새 비밀번호</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />

        <button type="submit">정보 수정</button>
      </form>
    </div>
  );
}
