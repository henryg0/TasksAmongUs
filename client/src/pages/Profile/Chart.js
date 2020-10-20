import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
// import ResponsiveContainer from 'recharts/ResponsiveContainer';

const data = [
  {
    name: 'Mon', tasks: 4,
  },
  {
    name: 'Tues', tasks: 6,
  },
  {
    name: 'Wed', tasks: 2,
  },
  {
    name: 'Thur', tasks: 1,
  },
  {
    name: 'Fri', tasks: 3,
  },
  {
    name: 'Sat', tasks: 4,
  },
  {
    name: 'Sun', tasks: 5,
  },
];

export default function Chart() {
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 0, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="tasks" stroke="#8884d8" activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
