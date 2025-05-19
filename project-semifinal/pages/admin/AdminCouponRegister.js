import React, { useState } from 'react';
import api from '../../api';
import '../../css/AdminCouponRegister.css';

export default function AdminCouponRegister() {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [discount, setDiscount] = useState(0);
  const [type, setType] = useState('FIXED');
  const [expiryDate, setExpiryDate] = useState('');
  const [autoIssued, setAutoIssued] = useState(false);
  const [months, setMonths] = useState(1); // 만료까지 개월

  const handleSubmit = (e) => {
        e.preventDefault();

  const couponTemplate = {
    code,
    title,
    discount,
    expiryDate: new Date(new Date().setMonth(new Date().getMonth() + months)).toISOString().slice(0, 19),
    //autoIssued: true,
    status: 'ACTIVE'
    };

    api.post('/coupons/admin/templates', couponTemplate)
      .then(() => {
        alert('쿠폰이 등록되었습니다.');
        setCode('');
        setTitle('');
        setDiscount(0);
        setType('FIXED');
        setExpiryDate('');
        setAutoIssued(false);
      })
      .catch(err => {
        console.error(err);
        alert('쿠폰 등록 실패');
      });
  };

  return (
    <div className="coupon-register-wrapper">
      <form onSubmit={handleSubmit} className="coupon-form">
        <label>
          쿠폰 코드
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
        </label>
        <label>
          쿠폰 이름
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          할인 금액
          <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} required />
        </label>
        <label>
        만료 기간 (개월 수)
        <input type="number" value={months} min={1} max={12}
                onChange={(e) => setMonths(parseInt(e.target.value))} />
        </label>
        <button type="submit">쿠폰 발행</button>
      </form>
    </div>
  );
}
