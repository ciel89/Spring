import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../css/AdminCouponList.css';
import AdminCouponRegister from './AdminCouponRegister';

export default function AdminCouponList() {
  const [coupons, setCoupons] = useState([]);
  const [view, setView] = useState('list');

  useEffect(() => {
  if (view === 'list') {
    api.get('/coupons/templates/available')
      .then(res => {
        console.log('쿠폰 응답:', res.data); 
        const data = Array.isArray(res.data) ? res.data : res.data.coupons; 
        setCoupons(data || []);
      })
      .catch(err => {
        console.error(err);
        alert('쿠폰 목록 조회 실패');
      });
  }
}, [view]);

const handleDelete = (id) => {
  if (window.confirm("정말 이 쿠폰을 삭제하시겠습니까?")) {
    api.delete(`/coupons/templates/${id}`)
      .then(() => {
        alert("쿠폰이 삭제되었습니다.");
        setCoupons(coupons.filter(c => c.id !== id)); 
      })
      .catch((err) => {
        console.error("삭제 실패:", err);
        alert("쿠폰 삭제에 실패했습니다.");
      });
  }
};


  return (
    <div className="coupon-list-wrapper">
      <h2>쿠폰 관리</h2>
      <div className="coupon-tab-buttons">
        <button onClick={() => setView('list')}>쿠폰 목록</button>
        <button onClick={() => setView('register')}>쿠폰 발행</button>
      </div>
      {view === 'register' ? (
        <AdminCouponRegister />
      ) : (
        <table className="coupon-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>코드</th>
              <th>쿠폰명</th>
              <th>할인</th>
              <th>만료일</th>
              <th>발급유형</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr><td colSpan="8">등록된 쿠폰이 없습니다.</td></tr>
            ) : (
              coupons.map(coupon => (
                <tr key={coupon.id}>
                  <td>{coupon.id}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.title}</td>
                  <td>{coupon.discount.toLocaleString()}</td>
                  <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                  <td>{coupon.autoIssued ? "회원등록발급" : "관리자발급"}</td>
                  <td>{coupon.status}</td>
                  <td>
                    <button onClick={() => handleDelete(coupon.id)}>삭제</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
