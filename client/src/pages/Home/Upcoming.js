import React, { useState } from 'react';
import List from '@material-ui/core/List';
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
      }}
    >
      <List>
        <TodoSpecial />
        <Todo />
        <Todo />
        <TodoSpecial />
        <TodoSpecial />
        <Todo />
      </List>
    </Card>
  );
}
