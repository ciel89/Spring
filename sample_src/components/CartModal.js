// src/components/CartModal.js
import React, { useState } from 'react';
import './CartModal.css';
import axios from 'axios';

export default function CartModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    axios.post('http://localhost:8080/api/cart', {
      productId: product.id,
      quantity
    })
    .then(() => {
      alert('장바구니에 담겼습니다!');
      onClose();
    })
    .catch((err) => {
      console.error('장바구니 등록 실패', err);
      alert('로그인이 필요합니다.');
    });
  };

  return (
    <div className="cart-modal-backdrop">
      <div className="cart-modal">
        <img src={product.imagePath} alt={product.name} className="product-image" />
        <h3>{product.name}</h3>
        <div className="qty-row">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>－</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>＋</button>
        </div>
        <p><strong>{(product.discountPrice || product.price).toLocaleString()}원</strong></p>
        <hr />
        <p><strong>총 상품금액: {(quantity * (product.discountPrice || product.price)).toLocaleString()}원</strong></p>
        <div className="modal-actions">
          <button onClick={onClose}>취소</button>
          <button className="submit" onClick={handleAddToCart}>장바구니</button>
        </div>
      </div>
    </div>
  );
}
