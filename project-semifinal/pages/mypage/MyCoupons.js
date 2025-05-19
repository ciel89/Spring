import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function MyCoupons() {
  const [myCoupons, setMyCoupons] = useState([]);

  useEffect(() => {
    api.get('/coupons/user-coupons')
      .then(res => setMyCoupons(res.data))
      .catch(err => console.error('내 쿠폰 조회 실패:', err));
  }, []);

  return (
    <div className="coupon-list">
      {myCoupons.length === 0 ? (
        <p>보유한 쿠폰이 없습니다.</p>
      ) : (
        <table className="coupon-table">
          <thead>
            <tr>
              <th>쿠폰명</th>
              <th>할인</th>
              <th>만료일</th>
              <th>발급유형</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {myCoupons.map(c => (
              <tr key={c.id} >
                <td>{c.template?.title}</td>
                <td>{c.template?.discount.toLocaleString()}원</td>
                <td>{new Date(c.expiryDate).toLocaleDateString()}</td>
                <td>{c.template?.autoIssued ? '자동발급' : '관리자발급'}</td>
                <td>{c.used ? '사용됨' : '미사용'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
