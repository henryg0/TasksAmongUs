import React from 'react';
import Card from '@material-ui/core/Card';
import Todo from '../../components/Todo';

export default function Highlights() {
  return (
    <Card 
      variant="outlined"
      style={{
        overflowY: "auto",
        maxHeight: "450px",
        height: "450px",
      }}
    >
      <Todo />
      <Todo />
      <Todo />
    </Card>
  );
}