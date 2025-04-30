// src/pages/CategoryPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryPage() {
  const { type } = useParams();
  return <h2 style={{ padding: '24px' }}>{type} 카테고리 상품 목록 페이지입니다</h2>;
}
