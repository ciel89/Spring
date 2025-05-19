import React, { useState } from 'react';
import AvailableCoupons from './AvailableCoupons';
import MyCoupons from './MyCoupons';
import '../../css/Coupons.css';

export default function Coupons() {
  const [view, setView] = useState('available');

  return (
    <div className="coupon-wrapper">
      <h3>쿠폰 관리</h3>
      <div className="coupon-tab">
        <button
          className={view === 'available' ? 'active' : ''}
          onClick={() => setView('available')}
        >
          사용 가능한 쿠폰
        </button>
        <button
          className={view === 'mine' ? 'active' : ''}
          onClick={() => setView('mine')}
        >
          내 쿠폰
        </button>
      </div>

      {view === 'available' ? <AvailableCoupons /> : <MyCoupons />}
    </div>
  );
}
