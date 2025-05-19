import React, { useState } from 'react';
import api from '../api';
import '../css/CartModal.css';

export default function CartModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('로그인이 필요합니다.');
      onClose();
      return;
    }

    api.post('/cart', {
      productId: product.id,
      quantity: quantity
    }, { withCredentials: true })
      .then(() => {
        alert('장바구니에 담겼습니다!');
        // 장바구니 수량 갱신
        const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
        const newCount = currentCount + 1;
        localStorage.setItem('cartCount', newCount);
        window.dispatchEvent(new Event('storage')); 

        onClose();
      })
      .catch((err) => {
        console.error('장바구니 추가 실패', err);
        alert('장바구니 추가 실패');
      });
  };

  const handleOrderNow = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('로그인이 필요합니다.');
      onClose();
      return;
    }

    api.post('/orders', {
      productId: product.id,
      quantity: quantity
    }, { withCredentials: true })
      .then(() => {
        alert('주문이 완료되었습니다!');
        onClose();
        window.location.href = '/mypage'; 
      })
      .catch((err) => {
        console.error('주문 실패', err);
        alert('주문 실패');
      });
  };

  return (
    <div className="modal-overlay">
      <div className="cart-modal">
        <h3>🛒 장바구니 담기</h3>
        <img src={`http://localhost:8080${product.imagePath}`} alt={product.name} />
        <p>{product.name}</p>
        <p>{product.price.toLocaleString()}원</p>
        <div className="quantity-control">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>취소</button>
          <button onClick={handleAddToCart}>장바구니</button>
          <button className="submit" onClick={handleOrderNow}>바로 주문</button>
        </div>
      </div>
    </div>
  );
}
