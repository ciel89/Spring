import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../css/AddressBook.css';

export default function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [view, setView] = useState('list'); 
  const [form, setForm] = useState({
    id: null,
    receiverName: '',
    receiverPhone: '',
    addressLine1: '',
    addressLine2: '',
    zipcode: '',
    isDefault: false
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const loadAddresses = () => {
    api.get('/addresses', { withCredentials: true })
      .then((res) => setAddresses(res.data))
      .catch(() => alert('주소 불러오기 실패'));
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearchAddress = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setForm((prev) => ({
          ...prev,
          addressLine1: data.address,
          zipcode: data.zonecode
        }));
      }
    }).open();
  };

  const handleSubmit = () => {
    const { receiverName, receiverPhone, addressLine1, zipcode, id, isDefault } = form;
    if (!receiverName || !receiverPhone || !addressLine1 || !zipcode) {
      return alert('필수 정보를 모두 입력해주세요.');
    }

    const payload = { receiverName, receiverPhone, addressLine1, addressLine2: form.addressLine2, zipcode, isDefault };

    const method = id
      ? api.put(`/addresses/${id}`, payload, { withCredentials: true })
      : api.post('/addresses', payload, { withCredentials: true });

    method.then(() => {
      resetForm();
      loadAddresses();
      setView('list');
    }).catch(() => alert(id ? '수정 실패' : '등록 실패'));
  };

  const handleEdit = (addr) => {
    setForm({ ...addr });
    setView('add');
  };

  const handleDelete = (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    api.delete(`/addresses/${id}`, { withCredentials: true })
      .then(() => loadAddresses())
      .catch(() => alert('삭제 실패'));
  };

  const handleSetDefault = (id) => {
    api.patch(`/addresses/${id}/default`, {}, { withCredentials: true })
      .then(() => loadAddresses())
      .catch(() => alert('기본 설정 실패'));
  };

  const resetForm = () => {
    setForm({
      id: null,
      receiverName: '',
      receiverPhone: '',
      addressLine1: '',
      addressLine2: '',
      zipcode: '',
      isDefault: false
    });
  };

  return (
    <div className="address-wrapper">
      <div className="tab-buttons" style={{ marginBottom: '1rem' }}>
        <button onClick={() => { resetForm(); setView('add'); }}>📮 배송지 등록</button>
        <button onClick={() => setView('list')}>📋 배송지 목록</button>
      </div>

      {view === 'add' && (
        <div className="address-form">
          <div className="address-basic">
            <input name="receiverName" placeholder="수령인" value={form.receiverName} onChange={handleChange} />
            <input name="receiverPhone" placeholder="연락처" value={form.receiverPhone} onChange={handleChange} />
          </div>
          <div className="address-basic">
            <input name="zipcode" placeholder="우편번호" value={form.zipcode} onChange={handleChange} />
            <button type="button" onClick={handleSearchAddress}>주소 검색</button>
          </div>
         <div className="address-basic">
           <input name="addressLine1" placeholder="주소" value={form.addressLine1} onChange={handleChange} />
           <input name="addressLine2" placeholder="상세 주소" value={form.addressLine2} onChange={handleChange} />
         </div>
            <label>
              <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={handleChange} /> 기본 배송지
            </label>
            <button onClick={handleSubmit}>{form.id ? '수정 완료' : '새 주소 등록'}</button>
            {form.id && <button onClick={resetForm}>취소</button>}
        </div>
      )}

      {view === 'list' && (
        <ul className="address-list">
          {addresses.map((addr) => (
            <li key={addr.id}>
              <div className="address-info">
                <strong>{addr.receiverName}</strong>
                <div className="contact-line">({addr.receiverPhone})</div>
                {addr.addressLine1} {addr.addressLine2} ({addr.zipcode})
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={addr.isDefault}
                      onChange={() => handleSetDefault(addr.id)}
                    /> 기본 배송지
                  </label>
                </div>
              </div>
              <div className="address-actions">
                <button onClick={() => handleEdit(addr)}>수정</button>
                <button onClick={() => handleDelete(addr.id)}>삭제</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
