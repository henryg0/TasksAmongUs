import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default function WeeklyChart(props) {
  let { dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven } = props;

  let data = [
    {
      name: daySeven.date, completed: daySeven.completed, failed: daySeven.failed,
    },
    {
      name: daySix.date, completed: daySix.completed, failed: daySix.failed,
    },
    {
      name: dayFive.date, completed: dayFive.completed, failed: dayFive.failed,
    },
    {
      name: dayFour.date, completed: dayFour.completed, failed: dayFour.failed,
    }, 
    {
      name: dayThree.date, completed: dayThree.completed, failed: dayThree.failed,
    },
    {
      name: dayTwo.date, completed: dayTwo.completed, failed: dayTwo.failed,
    },
    {
      name: dayOne.date, completed: dayOne.completed, failed: dayOne.failed,
    },
  ];

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
