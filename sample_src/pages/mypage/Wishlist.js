// src/pages/mypage/Wishlist.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Wishlist.css';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    axios.get('http://localhost:8080/api/wishlist', { withCredentials: true })
      .then((res) => setWishlist(res.data))
      .catch(() => alert('찜 목록을 불러올 수 없습니다.'));
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = (id) => {
    axios.delete(`http://localhost:8080/api/wishlist/${id}`, { withCredentials: true })
      .then(() => loadWishlist())
      .catch(() => alert('삭제 실패'));
  };

  return (
    <div className="wishlist-wrapper">
      <h3>💖 찜한 상품</h3>
      {wishlist.length === 0 ? (
        <p>찜한 상품이 없습니다.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={item.product.imagePath} alt={item.product.name} />
              <h4>{item.product.name}</h4>
              <p>{item.product.price.toLocaleString()}원</p>
              <button onClick={() => handleRemove(item.id)}>찜 제거</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
