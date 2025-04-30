// src/pages/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/CategoryPage.css';

export default function CategoryPage() {
  const { type } = useParams(); // 한식, 중식 등
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products?category=${type}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('상품 불러오기 실패:', err));
  }, [type]);

  return (
    <div className="category-wrapper">
      <h2>{type} 카테고리</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.imagePath} alt={p.name} />
            <div className="product-info">
              <p className="brand">대접몰</p>
              <p className="title">{p.name}</p>
              <p className="price">
                {p.discount > 0 && (
                  <span className="discount">{p.discount}%</span>
                )}
                <span className="final-price">{p.discountPrice.toLocaleString()}원</span>
                {p.discount > 0 && (
                  <span className="original-price">{p.price.toLocaleString()}원</span>
                )}
              </p>
              <p className="meta">
                {p.storage} · {p.cookTime}
              </p>
              <p className="rating">⭐ {p.rating || 0.0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

