import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../css/UserManage.css'; 

export default function UserManage() {
  const [users, setUsers] = useState([]);
  const fetchUsers = () => {
    api.get('/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error('회원 목록 불러오기 실패:', err));
  };

   useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('정말 이 회원을 삭제하시겠습니까?')) {
      api.delete(`/users/${id}`)
        .then(() => {
          alert('회원이 삭제되었습니다.');
          fetchUsers(); 
        })
        .catch((err) => {
          console.error('회원 삭제 실패:', err);
          alert('삭제 중 오류가 발생했습니다.');
        });
    }
  };

  return (
    <div className="admin-user-manage">
      <h2>회원 관리</h2>
      {users.length === 0 ? (
        <p>등록된 회원이 없습니다.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>회원 ID</th>
              <th>아이디</th>
              <th>이메일</th>
              <th>가입일</th>
              <th>권한</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
