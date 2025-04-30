// src/pages/mypage/MypageMain.js
import React, { useState } from 'react';
import './MypageMain.css';

import Orders from './Orders';
import Returns from './Returns';
import Wishlist from './Wishlist';
import Points from './Points';
import Coupons from './Coupons';
import Reviews from './Reviews';
import InquiryList from './InquiryList';
import ProfileEdit from './ProfileEdit';
import AddressBook from './AddressBook';

export default function MypageMain() {
  // 실제 로그인 시 axios로 세션 확인 예정
  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/users/me', { withCredentials: true })
  //     .then((res) => setUser(res.data))
  //     .catch(() => setUser(null));
  // }, []);

  // 👉 테스트용 더미 로그인 사용자 정보
  const [user, setUser] = useState({
    username: 'testuser'
  });

  const [selectedMenu, setSelectedMenu] = useState('orders');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'orders': return <Orders />;
      case 'returns': return <Returns />;
      case 'wishlist': return <Wishlist />;
      case 'points': return <Points />;
      case 'coupons': return <Coupons />;
      case 'reviews': return <Reviews />;
      case 'inquiries': return <InquiryList />;
      case 'profile': return <ProfileEdit />;
      case 'address': return <AddressBook />;
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
        <li onClick={() => setSelectedMenu('address')}>주소관리</li>
      </ul>

      <div className="mypage-content">
        {renderContent()}
      </div>
    </div>
  );
}
