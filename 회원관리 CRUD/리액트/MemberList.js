// React와 필요한 훅, 라우터 링크, axios 인스턴스를 불러옴
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 페이지 이동을 위한 컴포넌트
import api from "../api"; // Axios 인스턴스

function MemberList() {
  // members 상태 선언 (회원 목록 데이터를 배열로 저장)
  const [members, setMembers] = useState([]);

  // 컴포넌트가 마운트될 때 회원 목록을 서버에서 가져옴
  useEffect(() => {
    api.get("/members") // GET 요청으로 /members API 호출
      .then(res => setMembers(res.data)) // 응답 데이터를 members 상태에 저장
      .catch(err => alert("목록 불러오기 실패: " + err.message)); // 오류 발생 시 알림
  }, []); // 빈 배열로 설정 → 컴포넌트 최초 렌더링 시 한 번만 실행됨

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 회원 목록</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>비밀번호</th> {/* 주의: 실제 운영환경에서는 암호화된 비밀번호라도 화면에 노출하지 않음 */}
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          /* 회원 배열을 순회하며 테이블 행으로 렌더링 */
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.password}</td> {/* 암호화된 패스워드라면 노출 주의 */}
              <td>
                {/* 해당 회원을 수정하는 페이지로 이동 */}
                <Link to={`/members/edit/${member.id}`}>수정</Link>
              </td>
              <td>
                {/* 해당 회원을 삭제하는 페이지로 이동 */}
                <Link to={`/members/delete/${member.id}`}>삭제</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberList; // 다른 컴포넌트에서 사용할 수 있도록 export
