// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);

  const categories = [
    { name: '한식', type: 'korean' },
    { name: '중식', type: 'chinese' },
    { name: '양식', type: 'western' },
    { name: '일식', type: 'japanese' },
    { name: '간편식', type: 'simple' },
    { name: '건강식', type: 'healthy' },
    { name: '특가', type: 'sale' },
  ];

  const handleCategoryClick = (type) => {
    setSelectedCategory(type);
    axios
      .get(`http://localhost:8080/api/products?category=${type}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('상품 불러오기 실패', err));
  };

  return (
    <div className="home-wrapper">
      <h2>🍽 원하는 메뉴를 선택하세요</h2>
      <div className="category-menu">
        {categories.map((cat) => (
          <button
            key={cat.type}
            className={`category-button ${selectedCategory === cat.type ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat.type)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="category-section">
          <h3>{selectedCategory} 카테고리 상품</h3>
          <div className="product-grid">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <img src={p.imagePath} alt={p.name} />
                <div className="info">
                  <p className="title">{p.name}</p>
                  <p className="price">
                    {p.discount > 0 && <span className="discount">{p.discount}%</span>}
                    <span className="final">{(p.discountPrice || p.price).toLocaleString()}원</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
