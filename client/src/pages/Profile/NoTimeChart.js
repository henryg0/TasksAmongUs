import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

export default function NoTimeChart() {
  let [activeIndex, setActiveIndex] = useState(0);

  let data = [
    { name: 'Completed', value: 1, fill: '#0168AB'},
  ]

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={fill}>{payload.name}!</text>
        <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill}>{0} Todos</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius={50}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}