import React, { useState } from 'react';
import api from '../../api';
import '../../css/ProductRegister.css'; 

export default function ProductRegister() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
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

    if (!file) {
      alert('이미지를 선택해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('image', file);

    try {
      await api.post(`/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('상품 등록 성공!');
      setProduct({ name: '', description: '', price: '', category: '' });
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert('상품 등록 실패');
    }
  };

  return (
    <div className="product-register">
      <h3>상품 등록</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="상품명"
          value={product.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="상품 설명"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="가격"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
        />

        <div className="category-buttons">
          {['한식', '중식', '양식', '일식', '간편식', '건강식', '특가'].map((cat) => (
            <button
              type="button"
              key={cat}
              className={product.category === cat ? 'active' : ''}
              onClick={() => setProduct({ ...product, category: cat })}
            >
              {cat}
            </button>
          ))}
        </div>

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="미리보기" />
          </div>
        )}

        <button type="submit" className="submit-button">등록하기</button>
      </form>
    </div>
  );
}
