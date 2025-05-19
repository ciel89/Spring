import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import '../css/Header.css';

export default function Header() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // 초기 로딩 시 서버에서 수량 가져오기
    if (userId) {
      api.get(`/cart/user/${userId}`, { withCredentials: true })
        .then(res => {
          setCartCount(res.data.length);
          localStorage.setItem('cartCount', res.data.length);
        })
        .catch(() => setCartCount(0));
    }
    // storage 이벤트 수신 → 다른 컴포넌트에서 갱신 시 반영됨
    const handleStorage = () => {
      const saved = localStorage.getItem('cartCount');
      if (saved) setCartCount(parseInt(saved));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);


  const handleLogout = () => {
    api.post('/users/logout', {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        alert('로그아웃 되었습니다.');
        navigate('/');
      })
      .catch(() => alert('로그아웃 중 오류 발생'));
  };

  return (
    <header className="nav-header">
      <div className="logo">
        <Link to="/">🍽 풀대접</Link>
      </div>
      <nav className="nav-menu">
        <Link to="/support">고객센터</Link>
        {isLoggedIn ? (
          <>
            <Link to="/mypage">마이페이지</Link>
            <Link to="/change-password">비밀번호 변경</Link>
            {/* 장바구니 아이콘 표시 */}
            <span className="cart-icon" onClick={() => navigate('/cart')}>
              🛒 {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
            </span>
            <button onClick={handleLogout} className="logout-button">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
}