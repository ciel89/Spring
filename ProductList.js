// ProductList.js
import React, { useEffect, useState } from 'react';
import { deleteProduct, listProduct } from '../api/api';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm'; // ✅ 수정 폼

export default function ProductList({ loginUser }) {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // ✅ 수정 중인 상품
  const navigate = useNavigate();

  // 로그인된 사용자의 상품만 가져오기
  useEffect(() => {
    if (!loginUser) return;
    listProduct()
      .then(res => {
        const myProducts 
            = res.data.filter(p => p.user?.id === loginUser.id);
        setProducts(myProducts);
      })
      .catch(() => setProducts([]));
  }, [loginUser]);

  // 상품 삭제
  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('삭제 실패: ' + err.message);
    }
  };

  // 수정 버튼 클릭 시
  const handleEdit = (product) => {
    setEditProduct(product);
  };

  // 수정 완료 시 처리
  const handleEditComplete = () => {
    setEditProduct(null);
    // 목록 다시 불러오기
    listProduct()
      .then(res => {
        const myProducts = res.data.filter(p => p.user?.id === loginUser.id);
        setProducts(myProducts);
      });
  };

  return (
    <div>
    <h2>{loginUser?.name}님의 상품 목록</h2>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'flex-start'
    }}>
      
      {products.length === 0 && <p>등록한 상품이 없습니다.</p>}
      {products.map((product) => (
        <div key={product.id} style={{
          width: '200px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '10px',
          boxShadow: '0 0 8px rgba(0,0,0,0.1)'
        }}>
          {editProduct?.id === product.id ? (
            //수정 폼
            <ProductForm
              mode="edit"
              product={editProduct}
              loginUser={loginUser}
              onSuccess={handleEditComplete} // 
            />
          ) : (
            <>
              <img src={`http://localhost:8082${product.imagePath}`} alt={product.name} width="150" /><br />
              <strong>{product.name}</strong> - {product.price}원<br />
              <button onClick={() => handleEdit(product)}>수정</button>
              <button onClick={() => handleDelete(product.id)}>삭제</button>
            </>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}
