// React와 훅, 라우팅 기능, axios 인스턴스 import
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import api from "../api"; // Axios로 정의된 API 인스턴스

function MemberForm() {
  // form 상태 선언: name, email, password를 입력받음
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // 페이지 이동을 위한 useNavigate 훅
  const navigate = useNavigate();

  // input 값이 변경될 때 상태 업데이트
  const handleChange = (e) => {
    // 기존 form 상태를 유지하고, 해당 name 필드만 새로운 값으로 변경
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 폼이 제출될 때 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작(페이지 새로고침) 방지

    // POST 요청으로 회원 정보를 서버에 전송
    api.post("/members", form)
      .then(() => {
        alert("회원 등록 완료"); // 성공 시 알림
        navigate("/members");   // 회원 목록 페이지로 이동
      })
      .catch(err => alert("등록 실패: " + err.message)); // 실패 시 에러 알림
  };

  // 컴포넌트 렌더링
  return (
    <div style={{ padding: "20px" }}>
      <h2>회원 등록</h2>
      <form onSubmit={handleSubmit}>
        {/* 이름 입력 필드 */}
        <input 
          type="text" 
          name="name" 
          placeholder="이름" 
          value={form.name} 
          onChange={handleChange} 
          required 
        />
        <br />
        {/* 이메일 입력 필드 */}
        <input 
          type="email" 
          name="email" 
          placeholder="이메일" 
          value={form.email} 
          onChange={handleChange} 
          required 
        />
        <br />
        {/* 비밀번호 입력 필드 */}
        <input 
          type="password" 
          name="password" 
          placeholder="비밀번호" 
          value={form.password} 
          onChange={handleChange} 
          required 
        />
        <br />
        {/* 제출 버튼 */}
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default MemberForm; // 다른 파일에서 이 컴포넌트를 사용할 수 있도록 내보내기
