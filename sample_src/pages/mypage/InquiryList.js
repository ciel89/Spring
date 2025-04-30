// src/pages/mypage/InquiryList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InquiryList.css';

export default function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/inquiries', { withCredentials: true })
      .then((res) => setInquiries(res.data))
      .catch(() => alert('문의 내역 불러오기 실패'));
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="inquiry-list-wrapper">
      <h3>✉️ 1:1 문의 내역</h3>
      {inquiries.length === 0 ? (
        <p>문의하신 내용이 없습니다.</p>
      ) : (
        <ul className="inquiry-list">
          {inquiries.map((inq, index) => (
            <li key={inq.id}>
              <div className="inquiry-title" onClick={() => toggle(index)}>
                {inq.subject} <span>{inq.createdAt}</span>
              </div>
              {openIndex === index && (
                <div className="inquiry-content">{inq.content}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
