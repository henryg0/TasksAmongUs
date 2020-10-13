import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Mond', tasks: 4,
  },
  {
    name: 'Tues', tasks: 6,
  },
  {
    name: 'Wed', tasks: 2,
  },
  {
    name: 'Thurs', tasks: 1,
  },
  {
    name: 'Frid', tasks: 3,
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
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="tasks" stroke="#8884d8" activeDot={{ r: 6 }} />
    </LineChart>
  );
}
