import React from 'react';
import Card from '@material-ui/core/Card';
import Chart from './Chart';

export default function Productivity() {
  return (
    <Card
      className="p-2 mb-2"
      variant="outlined"
      style={{
        overflowY: "auto",
        maxHeight: "450px",
        height: "450px",
      }}
    >
      <Chart /> 
    </Card>
  )
}