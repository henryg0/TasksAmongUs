import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default function WeeklyChart(props) {
  let { weeklyProgress, counter} = props;
  let data = weeklyProgress;
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  for (const i in data) {
    if (data[i]["name"]) {
      data[i]["name"] = new Date(data[i]["name"] * 1000)
      data[i]["name"] = days[data[i]["name"].getDay()]
      if (data[i]["name"]) {
        data[i]["name"] = (data[i]["name"]).substring(0,3)
      }
    }
  }
  data[6]["completed"] += counter;
  
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
