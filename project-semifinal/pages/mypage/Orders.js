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

  const [points, setPoints] = useState(0); // 보유 포인트
  const [usedPoints, setUsedPoints] = useState(0); // 사용 포인트


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
    api.get('/users/me', { withCredentials: true })
    .then(res => {
      setPoints(res.data.point || 0); // 보유 포인트
    })
    .catch(() => setPoints(0));
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
    usedPoints: usedPoints
  };

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
      <div className="order-content">
        {/* 왼쪽: 이미지 + 기본정보 */}
        <div className="order-left">
          <img src={`http://localhost:8080${product.imagePath}`} alt={product.name} />
          <p className="product-name">{product.name}</p>
          <p className="product-price">{product.price.toLocaleString()}원</p>
        </div>

        {/* 오른쪽: 설명 + 리뷰평균 + 쿠폰/적립금 + 총가격 */}
        <div className="order-right">
          <p className="product-description">{product.description}</p>

          {averageRating !== null && (
            <p className="product-rating">
              평균 별점: {'⭐'.repeat(Math.round(averageRating))} ({averageRating.toFixed(1)})
            </p>
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
              {coupons.filter(c => !c.used).map(c => (
                <option key={c.id} value={c.id}>
                  {c.template?.title} ({c.template?.discount.toLocaleString()}원 할인)
                </option>
              ))}
            </select>
          </div>

          <div className="point-input">
            <label>보유 적립금: {points.toLocaleString()}원</label><br />
            <input
              type="number"
              value={usedPoints}
              onChange={(e) => {
                const value = Math.max(0, Math.min(points, Number(e.target.value)));
                setUsedPoints(value);
              }}
              placeholder="사용할 적립금 입력"
            />
          </div>

          <p className="total-price">
            총 가격: {(product.price * quantity - discount - usedPoints).toLocaleString()}원
          </p>
        </div>
      </div>

      {/* 하단 버튼 중앙 정렬 */}
      <div className="modal-actions center">
        <button onClick={() => navigate(-1)}>취소</button>
        <button onClick={handleAddToCart}>🛒 장바구니</button>
        <button className="submit" onClick={handleOrder}>주문하기</button>
      </div>
    </div>

    </div>
  );
}
