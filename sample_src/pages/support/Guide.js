// src/pages/support/Guide.js
import React from 'react';
import './Guide.css';

export default function Guide() {
  return (
    <div className="guide-wrapper">
      <h2>이용안내</h2>

      <section>
        <h3>1. 회원가입 안내</h3>
        <p>회원가입은 무료이며, 이메일 인증을 통해 가입이 완료됩니다.</p>
      </section>

      <section>
        <h3>2. 주문 및 결제</h3>
        <p>상품을 장바구니에 담고, 주문하기를 통해 카드 또는 무통장입금으로 결제하실 수 있습니다.</p>
      </section>

      <section>
        <h3>3. 배송 안내</h3>
        <p>당일 오후 3시 이전 결제 시, 당일 출고됩니다. 평균 1~2일 내 수령 가능합니다.</p>
      </section>

      <section>
        <h3>4. 교환/반품/환불</h3>
        <p>상품 수령 후 7일 이내 고객센터로 접수해주세요. 단, 신선식품은 단순 변심 반품이 불가합니다.</p>
      </section>

      <section>
        <h3>5. 고객센터</h3>
        <p>운영시간: 평일 10:00 ~ 17:00<br />문의전화: 02-1234-5678<br />이메일: help@example.com</p>
      </section>
    </div>
  );
}
