import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../css/Returns.css';

export default function Returns() {
  const [orders, setOrders] = useState([]);
  const [changedOrders, setChangedOrders] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const doneId = localStorage.getItem('changedOrderId');
    if (doneId) {
      setChangedOrders([Number(doneId)]);
      localStorage.removeItem('changedOrderId');
    }

    api.get('/orders/my/canceled')
      .then((res) => {
        console.log('취소/반품 내역:', res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.error('취소/반품 내역 불러오기 실패', err);
        alert('취소/반품 내역을 불러오지 못했습니다.');
      });
  }, []);

  const handleReorder = (productId, orderId) => {
    if (!productId) {
      alert('상품 정보가 올바르지 않습니다.');
      return;
    }

    api.post('/orders', { productId, quantity: 1 })
      .then(() => {
        alert('재주문이 완료되었습니다!');
        setChangedOrders((prev) => [...prev, orderId]);
      })
      .catch((err) => {
        console.error('재주문 실패:', err);
        alert('재주문에 실패했습니다.');
      });
  };

  const handleGoToOrderForm = (productId, orderId) => {
    navigate(`/orders/modify/${productId}?originalOrderId=${orderId}`);
  };

  if (orders.length === 0) {
    return <p>취소/반품 내역이 없습니다.</p>;
  }

  return (
    <div className="returns-history">
      <h3>취소/반품 내역</h3>
      <table>
        <thead>
          <tr>
            <th>주문번호</th>
            <th>상품명</th>
            <th>수량</th>
            <th>총 가격</th>
            <th>상태</th>
            <th>처리</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName || '상품정보 없음'}</td>
              <td>{order.quantity}</td>
              <td>{Number(order.totalPrice).toLocaleString()}원</td>
              <td>{order.status}</td>
              <td>
                {order.status === '취소' ? (
                  changedOrders.includes(order.id) ? (
                    <span>재주문 완료</span>
                  ) : (
                    <button onClick={() => handleReorder(order.productId, order.id)}>
                      재주문
                    </button>
                  )
                ) : order.status === '반품' ? (
                  changedOrders.includes(order.id) ? (
                    <span>변경 완료</span>
                  ) : (
                    <button onClick={() => handleGoToOrderForm(order.productId, order.id)}>
                      변경
                    </button>
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
