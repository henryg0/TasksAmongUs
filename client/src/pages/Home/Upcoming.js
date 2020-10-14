import React from 'react';
import Card from '@material-ui/core/Card';
import Todo from '../../components/Todo';
import TodoSpecial from '../../components/TodoSpecial';

export default function Upcoming() {
  return (
    <Card 
      variant="outlined"
      style={{
        overflowY: "auto",
        maxHeight: "450px",
        height: "450px",
        width: "100%",
      }}
    >
      <TodoSpecial />
      <Todo />
      <Todo />
      <TodoSpecial />
      <TodoSpecial />
      <Todo />
    </Card>
  );
}
