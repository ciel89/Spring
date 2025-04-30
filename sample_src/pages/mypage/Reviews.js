// src/pages/mypage/Reviews.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reviews.css';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/reviews/mine', { withCredentials: true })
      .then((res) => setReviews(res.data))
      .catch(() => alert('리뷰 불러오기 실패'));
  }, []);

  return (
    <div className="reviews-wrapper">
      <h3>✍ 내가 작성한 리뷰</h3>
      {reviews.length === 0 ? (
        <p>작성한 리뷰가 없습니다.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((r) => (
            <li key={r.id}>
              <strong>{r.productName}</strong>  
              <span className="stars">⭐ {r.rating}</span>
              <p>{r.comment}</p>
              <small>{r.createdAt}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
