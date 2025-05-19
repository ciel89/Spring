import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const salesData = [
  { date: '05-10', revenue: 120000 },
  { date: '05-11', revenue: 190000 },
  { date: '05-12', revenue: 135000 },
  { date: '05-13', revenue: 220000 },
  { date: '05-14', revenue: 175000 },
  { date: '05-15', revenue: 205000 },
];

export default function SalesLineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(v) => `${v / 1000}K`} />
        <Tooltip formatter={(value) => `${value.toLocaleString()}원`} />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="매출" 
              activeDot ={{r:7}} dot={{r:3}}/>
      </LineChart>
    </ResponsiveContainer>
  );
}
