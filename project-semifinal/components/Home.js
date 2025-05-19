import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../css/Home.css';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import CartModal from './CartModal';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); 

  const categories = [
    { name: '한식', type: '한식' },
    { name: '중식', type: '중식' },
    { name: '양식', type: '양식' },
    { name: '일식', type: '일식' },
    { name: '간편식', type: '간편식' },
    { name: '건강식', type: '건강식' },
    { name: '특가', type: '특가' },
  ];

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('상품 불러오기 실패', err));

    if (userId) {
      api.get(`/wishlists/user/${userId}`)
        .then(res => {
          const ids = res.data.map(w => w.productId);
          setLikedIds(ids);
        })
        .catch(() => setLikedIds([]));
    }
  }, []);

  const handleCategoryClick = (type) => {
    setSelectedCategory(type);
    const filtered = products.filter((p) => p.category === type);
    setFilteredProducts(filtered);
  };

  const handleWishlist = (productId) => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (likedIds.includes(productId)) {
      alert('이미 찜한 상품입니다.');
      return;
    }

    api.post('/wishlists', { userId, productId }, { withCredentials: true })
  .then(() => {
    alert('찜 목록에 추가되었습니다!');
    setLikedIds((prev) => [...prev, productId]);
  })
      .catch((err) => {
        console.error('찜 실패', err);
        alert('찜 추가 실패');
      });
  };

   //장바구니 아이콘 클릭 시 팝업 오픈
  const handleCartClick = (product) => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    setSelectedProduct(product);
    setShowCartModal(true);
  };

  return (
    <div className="home-wrapper">
      <h2>🍽 원하는 메뉴를 선택하세요</h2>
      <div className="category-menu">
        {categories.map((cat) => (
          <button
            key={cat.type}
            className={`category-button ${selectedCategory === cat.type ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat.type)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="category-section">
          <h3>{selectedCategory} 카테고리 상품</h3>
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="image-wrapper">
                    <img
                      src={`http://localhost:8080${p.imagePath}`}
                      alt={p.name}
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/order/${p.id}`)}
                    />
                    <div className="overlay-icons">
                      <FaHeart
                        className={`icon heart ${likedIds.includes(p.id) ? 'active' : ''}`}
                        onClick={() => handleWishlist(p.id)}
                      />
                      <FaShoppingCart
                        className="icon cart"
                        onClick={() => handleCartClick(p)} 
                      />
                    </div>
                  </div>
                  <div className="info">
                    <p className="title">{p.name}</p>
                    <p className="price">{Number(p.price).toLocaleString()}원</p>
                  </div>
                </div>
              ))
            ) : (
              <p>상품이 없습니다.</p>
            )}
          </div>
        </div>
      )}

      {/* 장바구니 팝업 렌더링 */}
      {showCartModal && selectedProduct && (
        <CartModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            setShowCartModal(false);
          }}
        />
      )}
    </div>
  );
}
