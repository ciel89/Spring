import React, { useEffect, useState } from 'react';
import '../../css/AdminPage.css';
import ProductRegister from './ProductRegister';
import ProductListAdmin from './ProductListAdmin';
import OrderManage from './OrderManage';
import UserManage from './UserManage';
import AdminInquiryList from './AdminInquiryList';
import AdminInquiryDetail from './AdminInquiryDetail';
import AdminCouponList from './AdminCouponList';
import AdminDashboard from './AdminDashbord';

export default function AdminPage() {
  const [role, setRole] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);


  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
    if (storedRole !== 'ADMIN') {
      alert('관리자만 접근할 수 있습니다.');
      window.location.href = '/';
    }
  }, []);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard': return <AdminDashboard />; 
      case 'productRegister': return <ProductRegister />;
      case 'productList': return <ProductListAdmin />;
      case 'orderManage': return <OrderManage />;
      case 'userManage': return <UserManage />;
      case 'inquiryList':
        return (
          <AdminInquiryList
            onSelectInquiry={(id) => {
              setSelectedInquiryId(id);
              setSelectedMenu('inquiryDetail');
            }}
          />
        );
      case 'inquiryDetail':
        return <AdminInquiryDetail inquiryId={selectedInquiryId} />;
      case 'coupon':  return <AdminCouponList />;
      default: return null;
    }
  };

  return (
    <div className="admin-wrapper">
      <h2>관리자 페이지</h2>
      <ul className="admin-menu">
         <li onClick={() => setSelectedMenu('dashboard')}>대시보드</li> 
        <li onClick={() => setSelectedMenu('productRegister')}>상품 등록</li>
        <li onClick={() => setSelectedMenu('productList')}>상품 목록</li>
        <li onClick={() => setSelectedMenu('orderManage')}>주문 관리</li>
        <li onClick={() => setSelectedMenu('userManage')}>회원 관리</li>
        <li onClick={() => setSelectedMenu('inquiryList')}>1:1문의</li>
        <li onClick={() => setSelectedMenu('coupon')}>쿠폰 관리</li>
      </ul>
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
} 
