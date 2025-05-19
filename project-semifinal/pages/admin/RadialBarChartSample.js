import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '일반회원', value: 80, fill: '#8884d8' },
  { name: 'VIP회원', value: 30, fill: '#82ca9d' },
  { name: '관리자', value: 10, fill: '#ffc658' },
];

export default function RadialBarChartSample() {
  return (
<div style={{width:'100%', height:'100%'}}>
    <ResponsiveContainer width='100%' height='100%'>
            <RadialBarChart
              innerRadius="20%"
              outerRadius="90%"
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar minAngle={15} background clockWise dataKey="value" />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
              <Tooltip formatter={(value) => `${value}명`} />
            </RadialBarChart>
    </ResponsiveContainer>
</div>
  );
}
