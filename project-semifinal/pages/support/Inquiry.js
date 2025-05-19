import React, { useState } from 'react';
import api from '../../api';
import '../../css/Inquiry.css';

export default function Inquiry() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',  
    content: '',  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/inquiries', {
      name: form.name,
      email: form.email,
      title: form.subject,    
      message: form.content   
    })
      .then(() => {
        alert('문의가 접수되었습니다.');
        setForm({ name: '', email: '', subject: '', content: '' });
      })
      .catch((err) => {
        console.error('문의 등록 실패', err);
        alert('문의 등록 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="inquiry-wrapper">
      <h2>1:1 문의</h2>
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="문의 제목"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="문의 내용"
          rows="6"
          value={form.content}
          onChange={handleChange}
          required
        />
        <button type="submit">문의 등록</button>
      </form>
    </div>
  );
}
