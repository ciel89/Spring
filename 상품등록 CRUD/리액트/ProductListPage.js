// React 및 훅, axios 인스턴스, 재사용 컴포넌트 import
import React, { useEffect, useState } from "react";
import api from "../api"; // Axios 인스턴스
import ProductItem from "../components/ProductItem"; // 개별 상품 표시용 컴포넌트

// 상품 목록 페이지 컴포넌트 정의
function ProductListPage() {
  // ✅ 상품 리스트 상태 선언 (초기값: 빈 배열)
  const [products, setProducts] = useState([]);

  // ✅ 페이지가 마운트될 때 상품 목록을 서버에서 불러옴
  useEffect(() => {
    api.get("/products") // GET 요청으로 상품 목록 조회
      .then(res => setProducts(res.data)) // 응답 데이터를 상태에 저장
      .catch(err => console.error("목록 조회 실패:", err)); // 오류 발생 시 로그 출력
  }, []); // 빈 배열이므로 최초 1회만 실행됨

  return (
    <div>
      <h2>📦 상품 목록</h2>

      {/* 상품 배열을 반복하여 ProductItem 컴포넌트로 렌더링 */}
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

// 외부에서 사용할 수 있도록 export
export default ProductListPage;
