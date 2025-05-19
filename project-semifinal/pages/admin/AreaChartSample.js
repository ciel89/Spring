import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '05-10', users: 100 },
  { date: '05-11', users: 180 },
  { date: '05-12', users: 230 },
  { date: '05-13', users: 300 },
];

export default function AreaChartSample() {
  return (
    <div style={{width:'100%', height:'100%'}}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" name="누적 회원 수" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
