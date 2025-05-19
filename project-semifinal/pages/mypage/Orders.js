import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../css/Orders.css';

export default function Orders() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState([]);
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('상품 정보 불러오기 실패', err));
    api.get(`/reviews/product/${id}/average`)
      .then(res => setAverageRating(res.data.averageRating))
      .catch(() => setAverageRating(null));
    api.get('/coupons/user-coupons', { withCredentials: true })
    .then(res => {
      console.log("내 쿠폰 목록:", res.data); 
      setCoupons(res.data);
    });
  }, [id]);

const handleOrder = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('로그인이 필요합니다.');
    return;
  }

  const orderData = {
    productId: product.id,
    quantity: quantity,
  };

  // ✅ 선택한 쿠폰이 있으면 포함
  if (selectedCouponId) {
    orderData.couponId = selectedCouponId;
  }

  api.post('/orders', orderData, { withCredentials: true })
    .then(() => {
      alert('주문이 완료되었습니다!');
      navigate('/mypage');
    })
    .catch((err) => {
      console.error('주문 실패:', err);
      alert('주문에 실패했습니다.');
    });
};

const handleAddToCart = () => {
  api.post('/cart', {
    productId: product.id,
    quantity: quantity
  }, { withCredentials: true })
    .then(() => {
      alert('장바구니에 추가되었습니다!');
      const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
      const newCount = currentCount + 1;
      localStorage.setItem('cartCount', newCount);
      window.dispatchEvent(new Event('storage')); 
      navigate('/cart'); 
    })
    .catch((err) => {
      console.error('장바구니 추가 실패:', err);
      alert('장바구니 추가에 실패했습니다.');
    });
};

  if (!product) return <p>상품 정보를 불러오는 중...</p>;

  return (
    <div className="modal-overlay">
      <div className="order-modal">
        <h3>주문하기</h3>
        <img src={`http://localhost:8080${product.imagePath}`} alt={product.name} />
        <p>{product.name}</p>
        <p>{product.price.toLocaleString()}원</p>
        <p>{product.description}</p>

        {averageRating !== null && (
          <p>평균 별점: {'⭐'.repeat(Math.round(averageRating))} ({averageRating.toFixed(1)})</p>
        )}
        <div className="quantity-control">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <div className="coupon-select">
          <label>쿠폰 선택: </label>
          <select
            onChange={(e) => {
              const selected = coupons.find(c => c.id === parseInt(e.target.value));
              setSelectedCouponId(selected?.id || null);
              setDiscount(selected?.template?.discount || 0); 
            }}
          >
            <option value="">-- 쿠폰 선택 안함 --</option>
            {coupons
            .filter(c => !c.used) 
            .map(c => (
              <option key={c.id} value={c.id}>
                {c.template?.title} ({c.template?.discount.toLocaleString()}원 할인)
              </option>
            ))}
          </select>
        </div>


        <p>총 가격: {(product.price * quantity - discount).toLocaleString()}원</p>

        <div className="modal-actions">
          <button onClick={() => navigate(-1)}>취소</button>
          <button onClick={handleAddToCart}>🛒 장바구니</button>
          <button className="submit" onClick={handleOrder}>주문하기</button>
        </div>
      </div>
    </div>
  );
}
