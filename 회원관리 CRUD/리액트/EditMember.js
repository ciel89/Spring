// React 및 훅들(import), 라우터 도구, axios 인스턴스 import
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // URL 파라미터 추출 및 페이지 이동
import api from "../api"; // 설정된 axios 인스턴스 (baseURL 포함)

// 회원 정보 수정 페이지 컴포넌트 정의
function EditMember() {
  // URL 경로에 포함된 회원 ID를 추출함 (예: /members/edit/3 → id = 3)
  const { id } = useParams();

  // 페이지 이동을 위한 useNavigate 훅 사용
  const navigate = useNavigate();

  // form 상태: 수정할 회원 정보를 담는 객체 (초기값은 빈 문자열)
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // 컴포넌트가 처음 렌더링되었을 때 실행되는 사이드 이펙트
  // 특정 id 회원의 기존 정보를 API로 불러옴
  useEffect(() => {
    api.get(`/members/${id}`) // GET 요청으로 회원 정보 가져오기
      .then(res => setForm(res.data)) // 성공 시 응답 데이터를 form 상태에 저장
      .catch(err => alert("회원 정보 불러오기 실패: " + err.message)); // 실패 시 경고창 출력
  }, [id]); // id가 변경되면 이 useEffect가 다시 실행됨

  // input 요소의 값이 변경될 때마다 호출되는 함수
  // name 속성에 따라 form 객체의 해당 필드를 업데이트
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // 전개 연산자(...)로 기존 값을 유지하며 변경 필드만 갱신
  };

  // 폼 제출 시 실행되는 함수
  // PUT 요청을 통해 회원 정보 수정 요청을 서버에 보냄
  const handleSubmit = (e) => {
    e.preventDefault(); // 브라우저의 기본 폼 제출 동작(페이지 새로고침)을 막음

    // 서버에 수정된 회원 정보를 PUT 요청으로 전송
    api.put(`/members/${id}`, form)
      .then(() => {
        alert("수정 완료"); // 성공 시 알림창 출력
        navigate("/members"); // 회원 목록 페이지로 이동
      })
      .catch(err => alert("수정 실패: " + err.message)); // 오류 발생 시 알림창 출력
  };

  // 렌더링되는 화면 구성 JSX 반환
  return (
    <div style={{ padding: "20px" }}>
      <h2>회원 수정</h2>
      <form onSubmit={handleSubmit}>
        {/* 이름 입력 필드 */}
        <input 
          type="text"              // 텍스트 타입
          name="name"              // form 상태에서 접근할 키
          value={form.name}        // 현재 상태 값과 연동
          onChange={handleChange}  // 값 변경 시 상태 업데이트
          required                 // 필수 입력 필드
        />
        <br />

        {/* 이메일 입력 필드 */}
        <input 
          type="email" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          required 
        />
        <br />

        {/* 비밀번호 입력 필드 (비밀번호도 수정 가능하도록 추가됨) */}
        <input 
          type="password" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
          required 
        />
        <br />

        {/* 제출 버튼 */}
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}

// 컴포넌트를 외부에서 사용할 수 있도록 export
export default EditMember;
