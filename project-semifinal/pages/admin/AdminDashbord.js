import React from 'react';
import '../../css/AdminDashboard.css';

// 차트 컴포넌트 import
import SalesLineChart from './SalesLineChart';
import OrderStatusPieChart from './OrderStatusPieChart';
import BarChartSample from './BarChartSample';
import AreaChartSample from './AreaChartSample';
import ComposedChartSample from './ComposedChartSample';
import RadialBarChartSample from './RadialBarChartSample';

export default function AdminDashboard() {
  const stats = {
    totalUsers: 325,
    todayOrders: 12,
    todayRevenue: 188000,
    totalProducts: 142,
  };

  const recentOrders = [
    { id: 1, user: 'hong123', amount: 32000, status: '배송중' },
    { id: 2, user: 'kim567', amount: 55000, status: '처리중' },
  ];

  const recentInquiries = [
    { id: 101, title: '배송이 너무 늦어요', user: 'lee77' },
    { id: 102, title: '쿠폰 적용 문의', user: 'jung88' },
  ];

  return (
    <div className="dashboard">
      <h3>관리자 대시보드</h3>
      {/* 상단 요약 카드 */}
      <div className="summary-cards">
        <div className="card">총 회원 수<br /><strong>{stats.totalUsers}</strong></div>
        <div className="card">오늘 주문<br /><strong>{stats.todayOrders}</strong></div>
        <div className="card">오늘 매출<br /><strong>{stats.todayRevenue.toLocaleString()}원</strong></div>
        <div className="card">등록 상품<br /><strong>{stats.totalProducts}</strong></div>
      </div>
      <div className="chart-row">
        <div className="chart-box">
          <h4>일별 매출 추이</h4>
          <SalesLineChart />
        </div>
        <div className="chart-box">
          <h4>주문 상태 분포</h4>
          <OrderStatusPieChart />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart-box">
          <h4>일별 주문 수</h4>
          <BarChartSample />
        </div>
        <div className="chart-box">
          <h4>누적 회원 수</h4>
          <AreaChartSample />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart-box">
          <h4>매출/주문 복합 분석</h4>
          <ComposedChartSample />
        </div>
        <div className="chart-box">
          <h4>회원 등급 비율</h4>
          <RadialBarChartSample />
        </div>
      </div>
      <div className="dashboard-lists">
        <div className="list-section">
          <h4>최근 주문</h4>
          <ul>
            {recentOrders.map(order => (
              <li key={order.id}>
                <strong>{order.user}</strong> - {order.amount.toLocaleString()}원 - {order.status}
              </li>
            ))}
          </ul>
        </div>
        <div className="list-section">
          <h4>최근 문의</h4>
          <ul>
            {recentInquiries.map(q => (
              <li key={q.id}>
                <strong>{q.user}</strong> - {q.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
