import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../css/OrderHistory.css';
import PaymentModal from './PaymentModal';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const openPaymentModal = (orderId) => {
  setCurrentOrderId(orderId);
  setShowPaymentModal(true);
  };

  const handleFakePayment = () => {
  api.put(`/orders/${currentOrderId}/pay`)
    .then(() => {
      alert('결제가 완료되었습니다.');
      setShowPaymentModal(false);
      fetchOrders();
    })
    .catch(() => alert('결제 실패'));
  };

  useEffect(() => {
    fetchOrders();
    fetchAddresses();
  }, []);

  const fetchOrders = () => {
    api.get('/orders/my')
      .then((res) => setOrders(res.data))
      .catch(() => alert('주문 내역을 불러오지 못했습니다.'));
  };

  const fetchAddresses = () => {
    api.get('/addresses', { withCredentials: true })
      .then((res) => {
        setAddresses(res.data);
        const defaultAddress = res.data.find(addr => addr.isDefault);
        if (defaultAddress) setSelectedAddressId(defaultAddress.id);
      })
      .catch(() => alert('주소 불러오기 실패'));
  };

  const handlePayment = (orderId) => {
    if (!selectedAddressId) return alert('배송지를 선택해주세요.');

    api.post('/payments', {
      orderId,
      addressId: selectedAddressId
    }, { withCredentials: true })
      .then(() => {
        alert('결제가 완료되었습니다.');
        fetchOrders(); // 결제 후 갱신
      })
      .catch(() => alert('결제 실패'));
  };

  const handleCancel = (orderId) => {
    if (window.confirm('정말 주문을 취소하시겠습니까?')) {
      api.put(`/orders/${orderId}/cancel`)
        .then(() => {
          alert('주문이 취소되었습니다.');
          fetchOrders();
        })
        .catch(() => alert('주문 취소 실패'));
    }
  };

  return (
    <div className="order-history">
      <h3>나의 주문내역</h3>

      <div style={{ marginBottom: '16px' }}>
        <strong>배송지 선택: </strong>
        <select
          value={selectedAddressId || ''}
          onChange={(e) => setSelectedAddressId(Number(e.target.value))}
        >
          {addresses.map(addr => (
            <option key={addr.id} value={addr.id}>
              {addr.addressLine1} ({addr.receiverName})
              {addr.isDefault ? '🚛' : ''}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>주문번호</th>
            <th>상품명</th>
            <th>수량</th>
            <th>총 가격</th>
            <th>주문일자</th>
            <th>상태</th>
            <th>처리</th>
          </tr>
        </thead>
        <tbody>
          {orders.filter(order => order.status === '주문완료').map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{Number(order.totalPrice).toLocaleString()}원</td>
              <td>{order.createdAt?.replace('T', ' ').substring(0, 16)}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleCancel(order.id)}>취소</button>
                <button onClick={() => openPaymentModal(order.id)}>결제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

          {/* 결제 모달 렌더링 */}
    {showPaymentModal && (
      <PaymentModal
        onClose={() => setShowPaymentModal(false)}
        onConfirm={handleFakePayment}
      />
    )}
    </div>
  );
}
