import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../css/InquiryList.css';

export default function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    api.get('/inquiries/mine', { withCredentials: true })
      .then((res) => {
        setInquiries(res.data);
      })
      .catch((err) => {
        console.error('문의 내역 불러오기 실패', err);
        alert('문의 내역을 불러올 수 없습니다.');
      });
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="inquiry-list-wrapper">
      <h3>1:1 문의 내역</h3>
      {inquiries.length === 0 ? (
        <p>문의하신 내용이 없습니다.</p>
      ) : (
        <ul className="inquiry-list">
          {inquiries.map((inq, index) => (
            <li key={inq.id}>
              <div className="inquiry-title" onClick={() => toggle(index)}>
                {inq.title} 
                <span>{new Date(inq.createdAt).toLocaleString()}</span>
              </div>

              {openIndex === index && (
                <div className="inquiry-content">
                  <p>{inq.message}</p>

                  {inq.reply ? (
                    <div className="inquiry-reply">
                      <strong>관리자 답변:</strong>
                      <p>{inq.reply.content}</p>
                      <small>{new Date(inq.reply.repliedAt).toLocaleString()}</small>
                    </div>
                  ) : (
                    <p className="no-reply">아직 답변이 등록되지 않았습니다.</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
