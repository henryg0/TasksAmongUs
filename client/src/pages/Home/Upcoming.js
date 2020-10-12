import React, { useState } from 'react';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import Todo from '../../components/Todo';

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
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
      </List>
    </Card>
  );
}
