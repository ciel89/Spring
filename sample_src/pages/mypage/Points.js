// src/pages/mypage/Points.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Points.css';

export default function Points() {
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/points', { withCredentials: true })
      .then((res) => {
        setTotal(res.data.total);
        setHistory(res.data.history);
      })
      .catch(() => alert('포인트 정보를 불러올 수 없습니다.'));
  }, []);

  return (
    <div className="points-wrapper">
      <h3>💰 나의 포인트</h3>
      <p className="point-total">현재 보유 포인트: <strong>{total.toLocaleString()}P</strong></p>

      <table className="point-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>내역</th>
            <th>구분</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>{item.type}</td>
              <td className={item.amount >= 0 ? 'plus' : 'minus'}>
                {item.amount.toLocaleString()}P
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
