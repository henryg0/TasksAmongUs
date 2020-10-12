import React from 'react';
import Card from '@material-ui/core/Card';
import Todo from '../../components/Todo';

export default function TodoList() {
  return (
    <Card 
      variant="outlined"
      style={{
        overflowY: "auto",
        maxHeight: "450px",
        height: "450px",
        width: "100%"
      }}
      className="mb-2"
    >
      <Todo />
      <Todo />
      <Todo />
      <Todo />
    </Card>
  );
}
