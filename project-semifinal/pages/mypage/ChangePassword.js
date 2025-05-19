import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';  

export default function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    api.post('/users/change-password', {
      currentPassword: form.currentPassword,
      newPassword: form.newPassword
    }, { withCredentials: true })
      .then(() => {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        setForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        navigate('/mypage');
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data || '비밀번호 변경 중 오류 발생');
      });
  };

  return (
    <div className="change-password-wrapper">
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          placeholder="현재 비밀번호"
          value={form.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="새 비밀번호"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="새 비밀번호 확인"
          value={form.confirmNewPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">변경하기</button>
      </form>
    </div>
  );
}
