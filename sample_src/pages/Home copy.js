// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: '한식', path: 'korean' },
    { name: '중식', path: 'chinese' },
    { name: '양식', path: 'western' },
    { name: '일식', path: 'japanese' },
    { name: '간편식', path: 'simple' },
    { name: '건강식', path: 'healthy' },
    { name: '특가', path: 'sale' },
  ];

  return (
    <div className="home-wrapper">
      <h2>🍽 원하는 메뉴를 선택하세요</h2>
      <div className="category-menu">
        {categories.map((cat) => (
          <button
            key={cat.path}
            className="category-button"
            onClick={() => navigate(`/category/${cat.path}`)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

