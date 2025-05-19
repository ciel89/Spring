import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '05-10', revenue: 120000, orders: 12 },
  { date: '05-11', revenue: 190000, orders: 18 },
  { date: '05-12', revenue: 135000, orders: 9 },
  { date: '05-13', revenue: 220000, orders: 21 },
];

export default function ComposedChartSample() {
  return (
    <div style={{width:'100%', height:'100%'}}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" tickFormatter={(v) => `${v / 1000}K`} />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="right" dataKey="orders" barSize={20} fill="#413ea0" name="주문 수" />
          <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#ff7300" name="매출" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
