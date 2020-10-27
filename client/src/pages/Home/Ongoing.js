import React from 'react';
import Card from '@material-ui/core/Card';
import Todo from '../../components/Todo';
import TodoSpecial from '../../components/TodoSpecial';

export default function Unfinished() {
  return (
    <Card 
      variant="outlined"
      className="scrolling"
      style={{
        overflowY: "auto",
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
