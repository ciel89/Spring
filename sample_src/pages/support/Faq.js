// src/pages/support/Faq.js
import React, { useState } from 'react';
import './Faq.css';

const faqList = [
  {
    question: 'Q. 배송은 얼마나 걸리나요?',
    answer: 'A. 결제 완료 후 평균 1~2일 내에 배송됩니다.',
  },
  {
    question: 'Q. 주문 취소는 어떻게 하나요?',
    answer: 'A. 마이페이지 > 주문내역에서 직접 취소가 가능합니다.',
  },
  {
    question: 'Q. 제품에 문제가 있어요.',
    answer: 'A. 1:1 문의를 통해 사진과 함께 접수해주세요.',
  },
  {
    question: 'Q. 비회원도 주문이 가능한가요?',
    answer: 'A. 네, 비회원 주문도 가능합니다. 단, 주문 조회는 이메일로만 확인 가능합니다.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-wrapper">
      <h2>자주 묻는 질문 (FAQ)</h2>
      <ul className="faq-list">
        {faqList.map((item, index) => (
          <li key={index} className="faq-item">
            <div className="question" onClick={() => toggle(index)}>
              {item.question}
              <span className="icon">{openIndex === index ? '－' : '＋'}</span>
            </div>
            {openIndex === index && <div className="answer">{item.answer}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
