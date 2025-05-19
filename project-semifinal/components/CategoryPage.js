import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import '../css/CategoryPage.css';

export default function CategoryPage() {
  const { type } = useParams(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get(`/products?category=${type}`)
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
              <p className="title">
                <Link to ={`/products/${p.id}`}>{p.name}</Link>
                </p>
              <p className="price">
                {p.discountPrice.toLocaleString()}원
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

