import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const orderStatusData = [
  { name: '처리중', value: 10 },
  { name: '배송중', value: 20 },
  { name: '배송완료', value: 30 },
  { name: '취소', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function OrderStatusPieChart() {
  return (
    <div style={{width:"100%",  height:"100%"}}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={orderStatusData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {orderStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}건`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
