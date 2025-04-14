// React를 불러옴
import React from "react";

// 상품 등록/수정 폼 컴포넌트 정의
// props:
// - form: 상품 정보 상태 객체 (name, description, price 등)
// - onChange: 텍스트 input 값 변경 시 호출되는 핸들러
// - onImageChange: 이미지 파일 선택 시 호출되는 핸들러
// - onSubmit: 폼 제출 시 호출되는 핸들러
// - imagePreview: 선택한 이미지의 미리보기 URL
// - isEdit: true면 수정 모드, false면 등록 모드 (버튼 텍스트에 사용)
function ProductForm({ form, onChange, onImageChange, onSubmit, imagePreview, isEdit = false }) {
  return (
    // multipart/form-data: 파일 업로드를 위해 반드시 필요한 설정
    <form onSubmit={onSubmit} encType="multipart/form-data">

      {/* 상품명 입력 필드 */}
      <input 
        name="name" 
        value={form.name} 
        onChange={onChange} 
        placeholder="상품명" 
        required 
      />
      <br />

      {/* 상품 설명 입력 필드 */}
      <input 
        name="description" 
        value={form.description} 
        onChange={onChange} 
        placeholder="설명" 
        required 
      />
      <br />

      {/* 상품 가격 입력 필드 */}
      <input 
        name="price" 
        type="number" 
        value={form.price} 
        onChange={onChange} 
        placeholder="가격" 
        required 
      />
      <br />

      {/* 이미지 파일 선택 필드 */}
      <input 
        type="file" 
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
