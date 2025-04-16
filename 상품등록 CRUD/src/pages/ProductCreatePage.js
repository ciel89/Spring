// React 훅 및 라우터, axios 인스턴스, 재사용 폼 컴포넌트 import
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import api from "../api"; // axios 인스턴스
import ProductForm from "../components/ProductForm"; // 상품 등록/수정 폼 재사용 컴포넌트

// 상품 등록 페이지 컴포넌트
function ProductCreatePage() {

  const [form, setForm] = useState({
    name: "",  description: "",  price: "",  image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

   const handleChange = (e) => {
    const { name, value } = e.target;

   setForm((prev) => ({...prev,[name]: value}));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 

    // 상태에 이미지 파일 저장
    setForm((prev) => ({
      ...prev, image: file }));

    // 이미지 미리보기용 base64 데이터 URL 생성
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result); 
      reader.readAsDataURL(file); // base64로 읽음
    }
  };

  // 🔹 폼 제출 시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // 이미지 데이터를 전송
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", form.image); 

    try {
            api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/products");
    } catch (err) {
            alert(err.message);
    }
  };

   return (
    <div>
      <h2>상품 등록</h2>

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

