import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../css/CartPage.css';

export default function CartPage() {
  const [items, setItems] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;
    api.get(`/cart/user/${userId}`, { withCredentials: true })
      .then(res => setItems(res.data))
      .catch(() => alert('장바구니를 불러올 수 없습니다.'));
  }, []);

  const handleOrder = () => {
    api.post('/orders/from-cart', {}, { withCredentials: true })
    .then(() => {
      alert('주문이 완료되었습니다!');
      setItems([]); 
      window.location.href = '/mypage'; 
    })
    .catch((err) => {
      console.error('주문 실패:', err);
      alert('주문 처리 중 오류가 발생했습니다.');
    });
  };

  const handleRemove = (id) => {
    api.delete(`/cart/${id}`, { withCredentials: true })
      .then(() => {
      const newItems = items.filter(i => i.id !== id);
      setItems(newItems);

      const newCount = newItems.length;
      localStorage.setItem('cartCount', newCount);
      window.dispatchEvent(new Event('storage'));
    })
      .catch(() => alert('삭제 실패'));
  };

  const total = items.reduce((sum, item) =>
    item.product && item.product.price ? sum + item.quantity * item.product.price : sum
  , 0);


  return (
    <div className="cart-page">
      <h2>장바구니</h2>
      {items.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items
            .filter(item => item.product)
            .map(item => (
              <li key={item.id} className="cart-item">
                <img src={`http://localhost:8080${item.product.imagePath}`} alt={item.product.name} />
                <div>
                  <strong>{item.product.name}</strong>
                  <p>수량: {item.quantity}</p>
                  <p>가격: {(item.product.price * item.quantity).toLocaleString()}원</p>
                </div>
                <button onClick={() => handleRemove(item.id)}>❌</button>
              </li>
            ))}
          </ul>
          <h3>총 합계: {total.toLocaleString()}원</h3>
          <button onClick={handleOrder}>🛒 주문하기</button>
        </>
      )}
    </div>
  );
}
