import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../css/MypageMain.css';

import OrderHistory from './OrderHistory';
import Returns from './Returns';
import Wishlist from './Wishlist';
import Points from './Points';
import Coupons from './Coupons';
import Reviews from './Reviews';
import InquiryList from './InquiryList';
import ProfileEdit from './ProfileEdit';
import AddressBook from './AddressBook';
import CartPage from './CartPage';
import PaidOrderList from './PaidOrderList';

export default function MypageMain() {
  const [user, setUser] = useState(null);

 useEffect(() => {
     api.get('/users/me', { withCredentials: true })
       .then((res) => setUser(res.data))
       .catch(() => setUser(null));
   }, []);

  const [selectedMenu, setSelectedMenu] = useState(null);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'orders': return <OrderHistory />;
      case 'returns': return <Returns />;
      case 'wishlist': return <Wishlist />;
      case 'points': return <Points />;
      case 'coupons': return <Coupons />;
      case 'reviews': return <Reviews />;
      case 'inquiries': return <InquiryList />;
      case 'profile': return <ProfileEdit />;
      case 'address': return <AddressBook />;
      case 'cart' : return <CartPage />;
      case 'paid' : return <PaidOrderList />;
      default: return null;
    }
  };

  return (
    <div className="mypage-wrapper">
      <h2>{user ? `${user.username} 님의 마이페이지` : '마이페이지'}</h2>
      <ul className="mypage-menu">
        <li onClick={() => setSelectedMenu('orders')}>주문내역</li>
        <li onClick={() => setSelectedMenu('returns')}>취소/반품내역</li>
        <li onClick={() => setSelectedMenu('wishlist')}>찜내역</li>
        <li onClick={() => setSelectedMenu('points')}>포인트</li>
        <li onClick={() => setSelectedMenu('coupons')}>쿠폰</li>
        <li onClick={() => setSelectedMenu('reviews')}>리뷰</li>
        <li onClick={() => setSelectedMenu('inquiries')}>1:1문의</li>
        <li onClick={() => setSelectedMenu('profile')}>회원정보관리</li>
        <li onClick={() => setSelectedMenu('address')}>배송지관리</li>
        <li onClick={() => setSelectedMenu('cart')}>장바구니</li>
        <li onClick={() => setSelectedMenu('paid')}>결제완료</li>
      </ul>

      <div className="mypage-content">
        {renderContent()}
      </div>
    </div>
  );
}
