// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductEditPage from "./pages/ProductEditPage";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "#999" }}>
      {/* 아무 페이지도 표시하지 않고 메뉴만 보이도록 함 */}
      <p>상단 메뉴를 클릭하세요 🧭</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* ✅ 상단 메뉴 */}
      <nav style={{
        padding: "1rem",
        backgroundColor: "#f0f0f0",
        borderBottom: "1px solid #ccc",
        marginBottom: "2rem"
      }}>
        <Link to="/products" style={{ marginRight: "1.5rem" }}>🏠 상품 목록</Link>
        <Link to="/products/new">➕ 상품 등록</Link>
      </nav>

      {/* ✅ 라우팅 구성 */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* 처음에는 빈 화면 */}
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/new" element={<ProductCreatePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/:id/edit" element={<ProductEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
