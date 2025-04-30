// src/pages/mypage/Returns.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Returns.css';

export default function Returns() {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/returns', { withCredentials: true })
      .then((res) => setReturns(res.data))
      .catch(() => alert('취소/반품 내역을 불러올 수 없습니다.'));
  }, []);

  return (
    <div className="returns-wrapper">
      <h3>↩️ 취소/반품 내역</h3>
      {returns.length === 0 ? (
        <p>접수된 취소/반품 내역이 없습니다.</p>
      ) : (
        <table className="returns-table">
          <thead>
            <tr>
              <th>주문번호</th>
              <th>사유</th>
              <th>요청일</th>
              <th>처리상태</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((r) => (
              <tr key={r.id}>
                <td>{r.orderId}</td>
                <td>{r.reason}</td>
                <td>{r.requestDate}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
