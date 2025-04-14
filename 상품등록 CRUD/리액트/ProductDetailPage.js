// React 및 필요한 훅과 모듈 불러오기
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // 라우팅 관련 훅들
import api from "../api"; // Axios 인스턴스

// 상품 상세 페이지 컴포넌트
function ProductDetailPage() {
  const { id } = useParams(); // URL에서 상품 ID 추출 (/products/3 → id = 3)
  const [product, setProduct] = useState(null); // 상품 정보를 저장할 상태
  const navigate = useNavigate(); // 페이지 이동 훅

  // 🔹 컴포넌트가 처음 마운트될 때 상품 정보 조회
  useEffect(() => {
    api.get(`/products/${id}`) // 서버에 GET 요청하여 상품 정보 조회
      .then(res => setProduct(res.data)) // 응답 결과를 product 상태에 저장
      .catch(err => {
        console.error("조회 실패:", err); // 오류 로그 출력
        navigate("/"); // 오류 시 홈(/) 페이지로 이동
      });
  }, [id, navigate]); // id 또는 navigate 변경 시 재실행

  // 🔹 상품 삭제 처리 함수
  const handleDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) { // 사용자 확인
      await api.delete(`/products/${id}`); // DELETE 요청으로 상품 삭제
      navigate("/"); // 삭제 후 홈(/) 페이지로 이동
    }
  };

  // 🔹 데이터 로딩 중일 때 표시
  if (!product) return <div>⏳ 로딩 중...</div>;

  // 🔹 상품 정보가 로드되었을 때 화면 출력
  return (
    <div>
      {/* 상품명 */}
      <h2>{product.name}</h2>

      {/* 상품 설명 */}
      <p>{product.description}</p>

      {/* 가격 정보 */}
      <p>💰 {product.price}원</p>

      {/* 이미지가 존재할 경우 출력 */}
      {product.imagePath && (
        <img
          src={`http://localhost:8082${product.imagePath}`} // 서버에서 이미지 경로 조합
          alt={product.name}
          width="200"
        />
      )}

      {/* 수정/삭제 기능 */}
      <div>
        {/* 수정 페이지로 이동 */}
        <Link to={`/products/${id}/edit`}>✏️ 수정</Link>

        {/* 삭제 버튼 클릭 시 handleDelete 실행 */}
        <button onClick={handleDelete}>🗑️ 삭제</button>
      </div>
    </div>
  );
}

// 컴포넌트를 외부에서 사용할 수 있도록 export
export default ProductDetailPage;
