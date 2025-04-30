// src/pages/mypage/Coupons.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Coupons.css';

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/coupons', { withCredentials: true })
      .then((res) => setCoupons(res.data))
      .catch((err) => {
        console.error('쿠폰 조회 실패:', err);
        alert('쿠폰 정보를 불러오지 못했습니다.');
      });
  }, []);

  return (
    <div className="coupon-wrapper">
      <h3>🎟 보유 쿠폰</h3>
      {coupons.length === 0 ? (
        <p>보유 중인 쿠폰이 없습니다.</p>
      ) : (
        <table className="coupon-table">
          <thead>
            <tr>
              <th>쿠폰코드</th>
              <th>할인</th>
              <th>유효기간</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id}>
                <td>{c.code}</td>
                <td>{c.discount.toLocaleString()} {c.discount > 100 ? '원' : '%'}</td>
                <td>{c.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
