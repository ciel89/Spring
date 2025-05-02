import React from "react";
import { Link } from "react-router-dom";
import './ProductItem.css';

function ProductItem({ product }) {
  // 가격 천 단위 콤마 처리
  const formattedPrice = Number(product.price).toLocaleString();

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={`http://3.39.144.111:8082${product.imagePath}`}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{formattedPrice}원</p>
        <Link to={`/products/${product.id}`} className="edit-button">
          편집
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
