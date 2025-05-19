import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../css/OrderHistory.css'; 

export default function PaidOrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchPaidOrders();
  }, []);

  const fetchPaidOrders = () => {
    api.get('/orders/my')
      .then((res) => {
        const paidOrders = res.data.filter(order => order.status === '결제완료');
        setOrders(paidOrders);
      })
      .catch((err) => {
        console.error('결제완료된 주문 조회 실패', err);
        alert('데이터를 불러올 수 없습니다.');
      });
  };

  const handleReturn = (orderId) => {
    if (!window.confirm('정말 반품 처리하시겠습니까?')) return;

    api.put(`/orders/${orderId}/return`)
      .then(() => {
        alert('반품 완료되었습니다.');
        fetchPaidOrders(); 
      })
      .catch((err) => {
        console.error('반품 실패', err);
        alert('반품에 실패했습니다.');
      });
  };

  return (
    <div className="order-history">
      <h3>결제완료된 주문 목록</h3>
      {orders.length === 0 ? (
        <p>결제완료된 주문이 없습니다.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>주문번호</th>
              <th>상품명</th>
              <th>수량</th>
              <th>총 가격</th>
              <th>결제일</th>
              <th>상태</th>
              <th>처리</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{Number(order.totalPrice).toLocaleString()}원</td>
                <td>{order.createdAt?.replace('T', ' ').substring(0, 16)}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleReturn(order.id)}>반품</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
