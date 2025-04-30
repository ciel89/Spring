// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; // 스타일 분리

export default function Header() {
  return (
    <header className="nav-header">
      <div className="logo">
        <Link to="/">🍽 풀대접</Link>
      </div>
      <nav className="nav-menu">
        <Link to="/support">고객센터</Link>
        <Link to="/login">로그인</Link>
        <Link to="/register">회원가입</Link>
      </nav>
    </header>
  );
}
