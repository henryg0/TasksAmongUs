import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Mon', completed: 4, failed: 1,
  },
  {
    name: 'Tues', completed: 6, failed: 0,
  },
  {
    name: 'Wed', completed: 2, failed: 0,
  },
  {
    name: 'Thur', completed: 1, failed: 3,
  }, 
  {
    name: 'Fri', completed: 3, failed: 0,
  },
  {
    name: 'Sat', completed: 4, failed: 0,
  },
  {
    name: 'Sun', completed: 5, failed: 1,
  },
];

export default function WeeklyChart() {
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 50, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="completed" stroke="#0168AB" activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="failed" stroke="#EA6650" activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
