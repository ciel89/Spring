
import React from "react";

function ProductForm({ form, onChange, onImageChange, onSubmit, imagePreview, isEdit = false }) {
  return (
    // multipart/form-data: 파일 업로드를 위해 반드시 필요한 설정
    <form onSubmit={onSubmit} encType="multipart/form-data">

      상품명:
      <input 
        name="name" 
        value={form.name} 
        onChange={onChange} 
      />
      <br />

      상품설명:
      <input 
        name="description" 
        value={form.description} 
        onChange={onChange} 
      />
      <br />

      상품가격:
      <input 
        name="price" 
        type="number" 
        value={form.price} 
        onChange={onChange} 
      />
      <br />

      상품이미지:
      <input 
        type="file" 
        name="image"
        accept="image/*" // 이미지 파일만 선택 가능하도록 제한
        onChange={onImageChange} 
      />
      <br />

      {/* 이미지 미리보기: 사용자가 이미지를 선택했을 때 화면에 보여줌 */}
      {imagePreview && (
        <img 
          src={imagePreview} 
          alt="미리보기" 
          width="200" 
          style={{ marginTop: "10px" }} 
        />
      )}

      <br />

      {/* 제출 버튼 (수정 모드 또는 등록 모드에 따라 텍스트 변경) */}
      <button type="submit">
        {isEdit ? "수정" : "등록"}
      </button>
    </form>
  );
}

// 외부에서 이 컴포넌트를 사용할 수 있도록 export
export default ProductForm;
