// React 훅 및 라우터, axios 인스턴스, 재사용 폼 컴포넌트 import
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import api from "../api"; // axios 인스턴스
import ProductForm from "../components/ProductForm"; // 상품 등록/수정 폼 재사용 컴포넌트

// 상품 등록 페이지 컴포넌트
function ProductCreatePage() {
  // 🔹 입력값을 저장할 form 상태 정의
  const [form, setForm] = useState({
    name: "",           // 상품명
    description: "",    // 상품 설명
    price: "",          // 상품 가격
    image: null,        // 이미지 파일 객체
  });

  // 🔹 이미지 미리보기를 위한 상태 (URL 문자열 저장)
  const [imagePreview, setImagePreview] = useState(null);

  // 페이지 이동을 위한 라우터 훅
  const navigate = useNavigate();

  // 🔹 텍스트 input 값 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 상태 객체에서 name 키에 해당하는 값을 업데이트
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 이미지 파일 선택 시 처리 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택한 첫 번째 파일

    // 상태에 이미지 파일 저장
    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    // 이미지 미리보기용 base64 데이터 URL 생성
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result); // 읽기 완료 시 상태에 저장
      reader.readAsDataURL(file); // 파일을 base64로 읽음
    }
  };

  // 🔹 폼 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 동작(페이지 새로고침) 방지

    // 이미지 포함 데이터를 전송하기 위해 FormData 사용
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", form.image); // 이미지 파일 추가

    try {
      // 서버에 POST 요청 (multipart/form-data 타입)
      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ 등록 성공 시 → 상품 목록 페이지로 이동
      navigate("/products");
    } catch (err) {
      // ❌ 오류 발생 시 콘솔 출력 및 알림 표시
      console.error("❌ 상품 등록 실패:", err);
      alert("상품 등록에 실패했습니다.");
    }
  };

  // 🔹 화면 렌더링
  return (
    <div>
      <h2>➕ 상품 등록</h2>

      {/* 재사용 가능한 ProductForm 컴포넌트를 호출하여 폼 표시 */}
      <ProductForm
        form={form}                     // 입력 데이터
        onChange={handleChange}        // 텍스트 입력 변경 핸들러
        onImageChange={handleImageChange} // 이미지 선택 핸들러
        onSubmit={handleSubmit}        // 폼 제출 핸들러
        imagePreview={imagePreview}    // 미리보기 이미지 URL
      />
    </div>
  );
}

// 컴포넌트 외부 export
export default ProductCreatePage;

