import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../css/ProfileEdit.css';

export default function ProfileEdit() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    api.get('/users/me', { withCredentials: true })
      .then((res) => {
        setForm({
          username: res.data.username || '',
          email: res.data.email || '',
          phone: res.data.phone || ''
        });
      })
      .catch((err) => {
        console.error('회원 정보 불러오기 실패', err);
        alert('회원 정보를 불러오지 못했습니다.');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  const { email, phone } = form;

    api.put('/users/me', { email, phone }, { withCredentials: true })
      .then(() => alert('회원 정보가 수정되었습니다.'))
      .catch((err) => {
        console.error('회원 정보 수정 실패', err);
        alert('수정 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="profile-edit-wrapper">
      <h3>회원 정보 수정</h3>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>아이디</label>
          <input
            type="text"
            name="username"
            value={form.username || ''}
            readOnly 
          />
        </div>

        <div className="form-group">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={form.email || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>연락처</label>
          <input
            type="text"
            name="phone"
            value={form.phone || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit">수정</button>
      </form>
    </div>
  );
}
