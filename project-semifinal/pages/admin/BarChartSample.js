import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '05-10', orders: 12 },
  { date: '05-11', orders: 18 },
  { date: '05-12', orders: 9 },
  { date: '05-13', orders: 21 },
];

export default function BarChartSample() {
  return (
        <div style={{width:'100%', height:'100%'}}>
            <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#82ca9d" name="주문 수" />
                </BarChart>
            </ResponsiveContainer>
        </div>
  );
}
