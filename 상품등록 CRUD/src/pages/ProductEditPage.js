// React 및 필요한 훅과 라우터, axios 인스턴스 import
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import ProductForm from "../components/ProductForm"; // 재사용 가능한 상품 등록/수정 폼

function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null, // 새로 업로드할 이미지 파일
  });


  const [imagePreview, setImagePreview] = useState(null);

  // 상품 정보 불러오기 (컴포넌트 마운트 시 실행)
  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        const { name, description, price, imagePath } = res.data;

        setForm({
          name,
          description,
          price,
          image: null, // 새로 등록한 이미지로만 대체 가능
        });

        // 서버에서 받은 이미지 경로를 미리보기로 설정
        setImagePreview(`http://localhost:8082${imagePath}`);
      })
      .catch(() => navigate("/")); // 오류 시 홈으로 이동
  }, [id, navigate]);

  // 텍스트 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 이미지 선택 시 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // 이미지 상태에 파일 객체 저장
    setForm(prev => ({
      ...prev,
      image: file,
    }));

    // 미리보기 이미지 생성 (base64 인코딩)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result); // 상태에 미리보기 URL 저장
      reader.readAsDataURL(file);
    }
  };

  // 수정 폼 제출 시 실행되는 함수
  const handleSubmit =(e) => {
    e.preventDefault(); // 기본 폼 동작 방지

    // 서버에 보낼 FormData 구성
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);

    // 새 이미지가 있을 경우에만 FormData에 포함
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      // PUT 요청으로 서버에 상품 수정 요청
      api.put(`/products/${id}`, formData);

      // 수정 성공 시 목록 페이지로 이동
      navigate("/products");
    } catch (err) {
      console.error("수정 실패:", err);
    }
  };

  // 🔹 컴포넌트 렌더링
  return (
    <div>
      <h2>상품 수정</h2>

      {/* 재사용 가능한 ProductForm 컴포넌트에 props 전달 */}
      <ProductForm
        form={form}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
        imagePreview={imagePreview}
        isEdit={true} // 수정 모드 활성화 (버튼 텍스트 등 구분용)
      />
    </div>
  );
}

// 컴포넌트를 외부에서 사용할 수 있도록 export
export default ProductEditPage;
