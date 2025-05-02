import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import ProductForm from "../components/ProductForm"; 

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  //상품 정보를 불러와서 form에 설정
  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        const { name, description, price, imagePath } = res.data;
        setForm({
          name,
          description,
          price,
          image: null, 
        });
        setImagePreview(`http://3.39.144.111:8082${imagePath}`);
      })
      .catch(() => navigate("/")); // 오류 시 홈으로 이동
  }, [id, navigate]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm(prev => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 수정 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (form.image) formData.append("image", form.image);

    try {
      api.put(`/products/${id}`, formData);
      alert("수정 완료되었습니다!");
      navigate("/products");
    } catch (err) {
      console.error("수정 실패:", err);
    }
  };

  //삭제 핸들러
  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      api.delete(`/products/${id}`);
      alert("삭제 완료!");
      navigate("/"); // 목록 페이지로 이동
    }
  };

  return (
    <div>
      <h2>상품 편집</h2>
      <ProductForm
        form={form}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
        imagePreview={imagePreview}
        isEdit={true}
      />

      <button onClick={handleDelete} >삭제</button>
    </div>
  );
}

export default ProductDetail;
