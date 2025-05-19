import React, { useState } from 'react';
import '../../css/PaymentModal.css';

export default function PaymentModal({ onClose, onConfirm }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      return alert('카드번호는 16자리 숫자여야 합니다.');
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return alert('유효기간 형식은 MM/YY여야 합니다.');
    }
    if (cvc.length !== 3 || !/^\d+$/.test(cvc)) {
      return alert('CVC는 3자리 숫자여야 합니다.');
    }

    // 가상 결제 처리
    onConfirm();
  };

  return (
    <div className="payment-overlay">
      <div className="payment-modal">
        <h3>💳 결제 정보 입력</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="카드번호 (16자리)"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            placeholder="유효기간 (MM/YY)"
            maxLength="5"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <input
            placeholder="CVC (3자리)"
            maxLength="3"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          />
          <div className="payment-buttons">
            <button type="button" onClick={onClose}>취소</button>
            <button type="submit" className="submit">결제하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
