import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../css/OrderManage.css'; 

export default function OrderManage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('주문 목록 불러오기 실패:', err));
  }, []);

  return (
    <div className="admin-order-manage">
      <h2>주문 관리</h2>
      {orders.length === 0 ? (
        <p>등록된 주문이 없습니다.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>주문 ID</th>
              <th>주문자</th>
              <th>상품명</th>
              <th>수량</th>
              <th>총 금액</th>
              <th>상태</th>
              <th>주문일시</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.username}</td> 
                <td>{order.productName}</td> 
                <td>{order.quantity}</td>
                <td>{Number(order.totalPrice).toLocaleString()}원</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString('ko-KR')}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
