import React from "react";
import "../css/ProductForm.css"; // 👈 CSS 파일 추가

function ProductForm({ form, onChange, onImageChange, onSubmit, imagePreview, isEdit = false }) {
  return (
    <form onSubmit={onSubmit} encType="multipart/form-data" className="form-container">

      <div className="form-group">
        <label htmlFor="name">상품명:</label>
        <input 
          id="name"
          name="name" 
          value={form.name} 
          onChange={onChange} 
          type="text"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">상품설명:</label>
        <input 
          id="description"
          name="description" 
          value={form.description} 
          onChange={onChange} 
          type="text"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">상품가격:</label>
        <input 
          id="price"
          name="price" 
          type="number" 
          value={form.price} 
          onChange={onChange} 
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">상품이미지:</label>
        <input 
          id="image"
          type="file" 
          name="image"
          accept="image/*"
          onChange={onImageChange} 
        />
      </div>

      {imagePreview && (
        <div className="form-preview">
          <img 
            src={imagePreview} 
            alt="미리보기" 
          />
        </div>
      )}

      <div className="form-submit">
        <button type="submit">
          {isEdit ? "수정" : "등록"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
