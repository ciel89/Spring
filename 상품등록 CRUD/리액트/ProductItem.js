// React 기본 import
import React from "react";
// React Router의 Link 컴포넌트 import → 페이지 이동 시 사용
import { Link } from "react-router-dom";

// 개별 상품 항목을 표시하는 컴포넌트
// props:
// - product: 상품 객체 (id, name, description, price 등 포함)
function ProductItem({ product }) {
  return (
    <div
      style={{
        display: "flex",              // 가로 배치
        width: "700px",               // 전체 너비 제한
        alignItems: "center",         // 세로 중앙 정렬
        padding: "0.75rem 1rem",      // 내부 여백
        borderBottom: "1px solid #ddd", // 아래 경계선
        gap: "2rem"                   // 항목 간 간격
      }}
    >
      {/* 상품명 */}
      <div style={{ width: "150px", fontWeight: "bold" }}>
        {product.name}
      </div>

      {/* 상품 설명 (자동으로 남은 공간 차지) */}
      <div style={{ flex: 1 }}>
        {product.description}
      </div>

      {/* 상품 가격 (오른쪽 정렬) */}
      <div style={{ width: "100px", textAlign: "right" }}>
        {product.price}원
      </div>

      {/* 상세 보기 버튼 (가운데 정렬) */}
      <div style={{ width: "100px", textAlign: "center" }}>
        <Link to={`/products/${product.id}`}>상세 보기</Link>
      </div>
    </div>
  );
}

// 외부에서 이 컴포넌트를 사용할 수 있도록 export
export default ProductItem;
