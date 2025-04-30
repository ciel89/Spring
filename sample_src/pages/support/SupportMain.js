// src/pages/support/SupportMain.js
import React, { useState } from 'react';
import './SupportMain.css';

import Notice from './Notice';
import Faq from './Faq';
import Inquiry from './Inquiry';
import Guide from './Guide';

export default function SupportMain() {
  const [selected, setSelected] = useState('notice');

  const renderContent = () => {
    switch (selected) {
      case 'notice': return <Notice />;
      case 'faq': return <Faq />;
      case 'inquiry': return <Inquiry />;
      case 'guide': return <Guide />;
      default: return null;
    }
  };

  return (
    <div className="support-wrapper">
      <h2>고객센터</h2>
      <ul className="support-menu">
        <li onClick={() => setSelected('notice')}>공지사항</li>
        <li onClick={() => setSelected('faq')}>자주 묻는 질문</li>
        <li onClick={() => setSelected('inquiry')}>1:1 문의</li>
        <li onClick={() => setSelected('guide')}>이용안내</li>
      </ul>

      <div className="support-content">
        {renderContent()}
      </div>
    </div>
  );
}
