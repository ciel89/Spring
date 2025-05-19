import React, { useEffect, useState } from 'react';
import api from '../../api';
import ProductEditInline from './ProductEditInline';  // 경로 확인
import '../../css/ProductListAdmin.css';

export default function ProductListAdmin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // 상품 목록 불러오기
  const fetchProducts = () => {
    api.get('/products')
      .then((res) => {
      console.log("상품 목록 응답:", res.data);
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.warn("응답이 배열이 아닙니다:", res.data);
        setProducts([]);  // fallback
      }
    })
      .catch((err) => console.error('상품 목록 불러오기 실패:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('정말 이 상품을 삭제하시겠습니까?')) {
      api.delete(`/products/${id}`)
        .then(() => {
          alert('상품이 삭제되었습니다.');
          fetchProducts();  
        })
        .catch((err) => {
          console.error('상품 삭제 실패:', err);
          alert('상품 삭제에 실패했습니다.');
        });
    }
  };

  return (
    <div className="admin-product-list">
      <h2>상품 목록</h2>
      {products.length === 0 ? (
        <p>등록된 상품이 없습니다.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>상품명</th>
              <th>가격</th>
              <th>카테고리</th>
              <th>이미지</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{Number(product.price).toLocaleString()}원</td>
                <td>{product.category}</td>
                <td>
                  {product.imagePath ? (
                    <img
                      src={`http://localhost:8080${product.imagePath}`}
                      alt={product.name}
                      style={{ width: '80px' }}
                    />
                  ) : (
                    '이미지 없음'
                  )}
                </td>
                <td>
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="edit-button"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="delete-button"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingProduct && (
        <ProductEditInline
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdated={fetchProducts}
        />
      )}
    </div>
  );
}
