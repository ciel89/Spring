import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import '../../css/ProductEdit.css'; 

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        setProduct({
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          category: res.data.category,
          imagePath: res.data.imagePath,  
        });
      })
      .catch(err => {
        console.error('상품 조회 실패:', err);
        alert('상품을 불러오는 데 실패했습니다.');
      });
  }, [id]);

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
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', parseFloat(product.price));
    formData.append('category', product.category);

    if (file) {
      formData.append('image', file);
    }

    try {
      await api.put(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('상품이 수정되었습니다.');
      navigate('/admin/products');  // 목록 페이지로 이동
    } catch (err) {
      console.error('상품 수정 실패:', err);
      alert('상품 수정에 실패했습니다.');
    }
  };

  return (
    <div className="product-edit">
      <h3>상품 수정</h3>
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
        <button type="submit" className="submit-button">수정하기</button>
      </form>
    </div>
  );
}
