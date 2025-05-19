import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../css/ModifyOrderForm.css';

export default function ModifyOrderForm() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const originalOrderId = searchParams.get('originalOrderId');
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    api.get(`/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error('상품 정보 불러오기 실패', err);
        alert('상품 정보를 불러올 수 없습니다.');
      });
  }, [productId]);

  const handleSubmit = () => {
    if (!quantity || quantity < 1) {
      alert('수량을 올바르게 입력해주세요.');
      return;
    }

    api.post('/orders', {
      productId,
      quantity,
      address,
      memo,
      originalOrderId
    })
      .then(() => {
        alert('변경 주문이 완료되었습니다.');
        localStorage.setItem('changedOrderId', originalOrderId);
        navigate('/returns');
      })
      .catch((err) => {
        console.error('변경 주문 실패', err);
        alert('변경 주문에 실패했습니다.');
      });
  };

  if (!product) return <p>상품 정보를 불러오는 중...</p>;

  return (
    <div className="modify-order-form">
      <h3>변경 주문 작성</h3>
      <p><strong>상품명:</strong> {product.name}</p>
      <p><strong>기존 가격:</strong> {Number(product.price).toLocaleString()}원</p>
      <label>수량: <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></label>
      <label>배송지: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></label>
      <label>메모: <textarea value={memo} onChange={(e) => setMemo(e.target.value)} /></label>
      <button onClick={handleSubmit}>변경 주문하기</button>
    </div>
  );
}
