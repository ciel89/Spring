import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function AvailableCoupons() {
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [myCoupons, setMyCoupons] = useState([]);

  useEffect(() => {
    api.get('/coupons/templates/available')
      .then(res => setAvailableCoupons(res.data))
      .catch(err => console.error('쿠폰 목록 조회 실패:', err));

    api.get('/coupons/user-coupons')
      .then(res => setMyCoupons(res.data))
      .catch(err => console.error('보유 쿠폰 조회 실패:', err));
  }, []);

  const hasCoupon = (templateId) =>
    myCoupons.some(c => c.template?.id === templateId);

  const handleDownload = (templateId) => {
  api.post(`/coupons/download/${templateId}`, {}, { withCredentials: true })
    .then(() => {
      alert('쿠폰 다운로드 완료');
      return api.get('/coupons/templates/available'); 
    })
    .then(res => {
      setAvailableCoupons(res.data); 
    })
    .catch(err => {
      alert('다운로드 실패');
    });
};


  return (
    <div className="coupon-list">
      {availableCoupons.length === 0 ? (
        <p>등록된 쿠폰이 없습니다.</p>
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
            {availableCoupons
            .map(c => {
              const owned = hasCoupon(c.id);
              return (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>{c.discount.toLocaleString()}원</td>
                  <td>{new Date(c.expiryDate).toLocaleDateString()}</td>
                  <td>{c.autoIssued ? '자동발급' : '관리자발급'}</td>
                  <td>
                    <button onClick={() => handleDownload(c.id)}>다운로드</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
