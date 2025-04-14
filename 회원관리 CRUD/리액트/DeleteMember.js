// React, 라우팅 도구, axios 인스턴스 불러오기
import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // URL 파라미터(id)와 페이지 이동 함수
import api from "../api"; // Axios 인스턴스

function DeleteMember() {
  const { id } = useParams(); // URL에서 회원 ID 추출 (예: /members/delete/3 이면 id = 3)
  const navigate = useNavigate(); // 페이지 이동 함수

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDelete = () => {
    api.delete(`/members/${id}`) // DELETE 요청으로 회원 삭제
      .then(() => {
        alert("삭제 완료"); // 성공 알림
        navigate("/members"); // 회원 목록 페이지로 이동
      })
      .catch(err => alert("삭제 실패: " + err.message)); // 오류 발생 시 알림
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>회원 삭제</h2>
      <p>정말 이 회원을 삭제하시겠습니까?</p>
      {/* 삭제 버튼 → 클릭 시 handleDelete 실행 */}
      <button onClick={handleDelete}>삭제</button>
      {/* 취소 버튼 → 목록 페이지로 이동 */}
      <button onClick={() => navigate("/members")} style={{ marginLeft: "10px" }}>취소</button>
    </div>
  );
}

export default DeleteMember; // 다른 컴포넌트에서 사용할 수 있도록 export
