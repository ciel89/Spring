// ProductForm.js
import React, { useEffect, useState } from 'react';
import { createProduct, updateProduct } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function ProductForm({ mode = "create", product = null, loginUser, onSuccess}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && product) {
      setName(product.name);
      setPrice(product.price);
      setPreviewImage(`http://localhost:8082${product.imagePath}`); // 기존 이미지도 보여주기
    }
  }, [mode, product]);

  // 파일 선택 시 미리보기 처리
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // base64 URL 설정
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (file) formData.append("image", file);
    if (mode === "create" && loginUser) {
      formData.append("userId", loginUser.id);
    }

    try {
      if (mode === "create") {
        await createProduct(formData);
        navigate('/my-products');
      } else {
        await updateProduct(product.id, formData);
        if (onSuccess) onSuccess();
        navigate('/my-products');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === "edit" ? "상품 수정" : "상품 등록"}</h2>
      상품명: <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}  /><br />
      가격: <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)}  /><br />
      이미지: <input type="file" name="image" onChange={handleFileChange} /><br />
      
      {previewImage && (
        <div>
          <img src={previewImage} alt="미리보기" width="150"  />
        </div>
      )}
      <button type="submit">{mode === "edit" ? "수정하기" : "등록하기"}</button>
    </form>
  );
}

