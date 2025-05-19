import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../css/Reviews.css';

export default function Reviews() {
  const [orders, setOrders] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [activeTab, setActiveTab] = useState('write'); 

  useEffect(() => {
    api.get('/orders/my/reviewable', { withCredentials: true })
      .then(res => setOrders(res.data))
      .catch(() => alert('작성 가능한 리뷰를 불러올 수 없습니다.'));
  }, []);

  useEffect(() => {
    api.get('/reviews/mine', { withCredentials: true })
      .then(res => setMyReviews(res.data))
      .catch(() => alert('내 리뷰를 불러올 수 없습니다.'));
  }, []);

  const handleRatingChange = (orderId, value) => {
    setRatings({ ...ratings, [orderId]: value });
  };

  const handleCommentChange = (orderId, value) => {
    setComments({ ...comments, [orderId]: value });
  };

  const handleSubmitReview = (order) => {
    const rating = ratings[order.orderId];
    const comment = comments[order.orderId];

    if (!rating || !comment) {
      alert('별점과 내용을 모두 입력해주세요.');
      return;
    }

    api.post('/reviews', {
      productId: order.productId,
      rating,
      comment
    }, { withCredentials: true })
      .then(() => {
        alert('리뷰가 등록되었습니다!');
        setOrders(prev => prev.filter(o => o.orderId !== order.orderId));
        setRatings(prev => ({ ...prev, [order.orderId]: '' }));
        setComments(prev => ({ ...prev, [order.orderId]: '' }));

        return api.get('/reviews/mine', { withCredentials: true });
      })
      .then(res => setMyReviews(res.data))
      .catch(() => alert('리뷰 등록 또는 갱신 실패'));
  };

  return (
    <div className="review-page">
      <div className="review-tabs">
        <button
          className={activeTab === 'write' ? 'active' : ''}
          onClick={() => setActiveTab('write')}
        >
          ✍ 리뷰 작성
        </button>
        <button
          className={activeTab === 'list' ? 'active' : ''}
          onClick={() => setActiveTab('list')}
        >
          📝 내가 쓴 리뷰
        </button>
      </div>

      {activeTab === 'write' && (
        <div className="review-write">
          {orders.length === 0 ? (
            <p>작성할 수 있는 리뷰가 없습니다.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>주문번호</th>
                  <th>상품명</th>
                  <th>별점</th>
                  <th>내용</th>
                  <th>등록</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.productName}</td>
                    <td>
                      <select
                        value={ratings[order.orderId] || ''}
                        onChange={(e) => handleRatingChange(order.orderId, e.target.value)}
                      >
                        <option value="">선택</option>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                      </select>
                    </td>
                    <td>
                      <textarea
                        rows="2"
                        value={comments[order.orderId] || ''}
                        onChange={(e) => handleCommentChange(order.orderId, e.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSubmitReview(order)}>등록</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'list' && (
        <div className="review-mylist">
          {myReviews.length === 0 ? (
            <p>작성한 리뷰가 없습니다.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>별점</th>
                  <th>내용</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {myReviews.map((r) => (
                  <tr key={r.id}>
                    <td>{r.productName}</td>
                    <td>{'⭐'.repeat(r.rating)}</td>
                    <td>{r.comment}</td>
                    <td>{r.createdAt?.substring(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
