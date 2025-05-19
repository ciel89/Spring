import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../css/AdminInquiryList.css';

export default function AdminInquiryList({ onSelectInquiry }) {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    api.get('/inquiries')
      .then((res) => setInquiries(res.data))
      .catch((err) => console.error('전체 문의 로딩 실패', err));
  }, []);

  return (
    <div className="inquiry-list-wrapper">
      <h3>1:1 문의 목록</h3>
      <table className="inquiry-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>답변 여부</th>  {/* 추가 */}
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq) => (
            <tr key={inq.id}>
              <td>{inq.id}</td>
              <td>{inq.title}</td>
              <td>{inq.name || inq.user?.username}</td>
              <td>{new Date(inq.createdAt).toLocaleString()}</td>
              <td style={{ color: inq.reply ? 'green' : 'red', fontWeight: 'bold' }}>
                  {inq.reply ? '답변 완료' : '미답변'}
              </td>
              <td>
                <button onClick={() => onSelectInquiry(inq.id)}>보기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}