// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>🏠 상품 목록</Link>
      <Link to="/products/new">➕ 상품 등록</Link>
    </nav>
  );
}

export default Navbar;
