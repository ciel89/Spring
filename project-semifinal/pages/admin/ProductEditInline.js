import React, { useState } from 'react';
import api from '../../api';
import '../../css/ProductEditInline.css'; 

export default function ProductEditInline({ product, onClose, onUpdated }) {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('description', updatedProduct.description);
    formData.append('price', parseFloat(updatedProduct.price));
    formData.append('category', updatedProduct.category);

    if (file) {
      formData.append('image', file);
    }

    try {
      await api.put(`/products/${product.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('상품이 수정되었습니다.');
      onUpdated();  
      onClose();    
    } catch (err) {
      console.error('상품 수정 실패:', err);
      alert('상품 수정에 실패했습니다.');
    }
  };

  return (
    <div className="product-edit-inline">
      <h3>상품 수정 (ID: {product.id})</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="상품명"
          value={updatedProduct.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="상품 설명"
          value={updatedProduct.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="가격"
          type="number"
          value={updatedProduct.price}
          onChange={handleChange}
          required
        />

        <div className="category-buttons">
          {['한식', '중식', '양식', '일식', '간편식', '건강식', '특가'].map((cat) => (
            <button
              type="button"
              key={cat}
              className={updatedProduct.category === cat ? 'active' : ''}
              onClick={() => setUpdatedProduct({ ...updatedProduct, category: cat })}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 기존 이미지 */}
        {product.imagePath && !preview && (
          <div className="current-image">
            <p>현재 이미지:</p>
            <img
              src={`http://localhost:8080${product.imagePath}`}
              alt={product.name}
              style={{ width: '150px' }}
            />
          </div>
        )}

        {preview && (
          <div className="image-preview">
            <p>새 이미지 미리보기:</p>
            <img src={preview} alt="미리보기" style={{ width: '150px' }} />
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" className="submit-button">저장</button>
        <button type="button" onClick={onClose} className="cancel-button">취소</button>
      </form>
    </div>
  );
}
