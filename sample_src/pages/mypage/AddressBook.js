// src/pages/mypage/AddressBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddressBook.css';

export default function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');

  // 주소 목록 불러오기
  const loadAddresses = () => {
    axios.get('http://localhost:8080/api/addresses', { withCredentials: true })
      .then((res) => setAddresses(res.data))
      .catch(() => alert('주소 불러오기 실패'));
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  // 새 주소 추가
  const handleAdd = () => {
    if (!newAddress) return alert('주소를 입력해주세요.');

    axios.post('http://localhost:8080/api/addresses', { address: newAddress }, { withCredentials: true })
      .then(() => {
        setNewAddress('');
        loadAddresses();
      })
      .catch(() => alert('주소 등록 실패'));
  };

  // 주소 삭제
  const handleDelete = (id) => {
    if (!window.confirm('이 주소를 삭제하시겠습니까?')) return;
    axios.delete(`http://localhost:8080/api/addresses/${id}`, { withCredentials: true })
      .then(() => loadAddresses())
      .catch(() => alert('삭제 실패'));
  };

  return (
    <div className="address-wrapper">
      <h3>🏠 주소 관리</h3>

      <div className="address-add">
        <input
          type="text"
          placeholder="새 주소 입력"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <button onClick={handleAdd}>추가</button>
      </div>

      <ul className="address-list">
        {addresses.map((addr) => (
          <li key={addr.id}>
            {addr.address}
            <button onClick={() => handleDelete(addr.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
