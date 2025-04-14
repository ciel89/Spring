import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav style={{ background: "#333", padding: "10px", color: "white" }}>
      <Link to="/" style={{ marginRight: "10px", color: "white" }}>홈</Link>
      <Link to="/members" style={{ marginRight: "10px", color: "white" }}>회원 목록</Link>
      <Link to="/members/new" style={{ color: "white" }}>회원 등록</Link>
    </nav>
  );
}

export default Navigation;
