import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../css/Wishlist.css';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/users/me', { withCredentials: true })
      .then((res) => {
        setUserId(res.data.id); 
      })
      .catch(() => {
        alert('로그인이 필요합니다.');
        navigate('/login');
      });
  }, []);

  useEffect(() => {
    if (!userId) return;

    api.get(`/wishlists/user/${userId}`, { withCredentials: true })
      .then((res) => setWishlist(res.data))
      .catch(() => alert('찜 목록을 불러올 수 없습니다.'));
  }, [userId]);

  // 찜 항목 제거
  const handleRemove = (id) => {
    api.delete(`/wishlists/${id}`, { withCredentials: true })
      .then(() => {
        setWishlist((prev) => prev.filter(item => item.id !== id));
      })
      .catch(() => alert('삭제 실패'));
  };

  // 주문하기
  const handleOrder = (productId) => {
    navigate(`/order/${productId}`);
  };

  return (
    <div className="wishlist-wrapper">
      <h3>찜한 상품</h3>
      {wishlist.length === 0 ? (
        <p>찜한 상품이 없습니다.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={`http://localhost:8080${item.imagePath}`} alt={item.productName} />
              <h4>{item.productName}</h4>
              <p>{item.price.toLocaleString()}원</p>
              <div className="wishlist-buttons">
                <button onClick={() => handleOrder(item.productId)}>주문하기</button>
                <button onClick={() => handleRemove(item.id)}>찜 제거</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
