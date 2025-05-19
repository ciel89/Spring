import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../css/AdminInquiryDetail.css';

export default function AdminInquiryDetail({ inquiryId }) {
  const [inquiry, setInquiry] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/inquiries/${inquiryId}`, { withCredentials: true })
      .then(res => setInquiry(res.data))
      .catch(err => console.error('문의 조회 실패:', err));
  }, [inquiryId]);

  const handleReplySubmit = () => {
    if (!replyContent.trim()) {
      alert('답변 내용을 입력해주세요.');
      return;
    }

    api.post(`/inquiries/admin/${inquiryId}/reply`, { content: replyContent }, { withCredentials: true })
      .then(() => {
        alert('답변이 등록되었습니다.');
        window.location.reload();
      })
      .catch(err => {
        console.error('답변 등록 실패:', err);
        alert('답변 등록에 실패했습니다.');
      });
  };

  if (!inquiry) return <div>로딩 중...</div>;

  return (
    <div className="admin-inquiry-detail">
      <h2>문의 상세</h2>

      <div className="inquiry-box">
        <h4>제목: {inquiry.title}</h4>
        <p className="inquiry-meta">
          작성자: {inquiry.name || inquiry.user?.username} / 작성일: {new Date(inquiry.createdAt).toLocaleString()}
        </p>
        <p className="inquiry-content">{inquiry.message}</p>
      </div>

      {inquiry.reply ? (
        <div className="reply-box">
          <h4>💬 관리자 답변</h4>
          <p>{inquiry.reply.content}</p>
          <p className="inquiry-meta">답변일: {new Date(inquiry.reply.repliedAt).toLocaleString()}</p>
        </div>
      ) : (
        <div className="reply-form">
          <h4>답변 작성</h4>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="답변 내용을 입력하세요..."
          />
          <button onClick={handleReplySubmit}>답변 등록</button>
        </div>
      )}
    </div>
  );
}
