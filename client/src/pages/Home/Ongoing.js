import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import OngoingTodo from './OngoingTodo';

export default function Ongoing(props) {
  const  { user } = props;
  const [ongoingTodos, setOngoingTodos] = useState([]);

  useEffect(() => {
    axios.get(`/api/user/${user.id}/todo/upcoming`)
      .then((res) => {
        if (res.data.err) {
          console.log(res.data.error);
        } else {
          console.log(res.data.todos);
          setOngoingTodos(res.data.todos);
        }
      }) 
  }, [])

  function getOngoingTodos() {
    let render = [];
    for (let i = 0; i < ongoingTodos.length; i++) {
      render.push(
        <OngoingTodo 
          // userId={ongoingTodos[i].userId}
          fullName={ongoingTodos[i].fullName}
          profileUrl={ongoingTodos[i].profileUrl}
          selectedBadge={ongoingTodos[i].selectedBadge}
          selectedBorder={ongoingTodos[i].selectedBorder}
          todoId={ongoingTodos[i].todoId}
          todoName={ongoingTodos[i].todoName}
          dueDate={ongoingTodos[i].dueDate}
          description={ongoingTodos[i].description}
          imageUrl={ongoingTodos[i].imageUrl}
          idx={i}
          key={i}
        />
      )
    }
    return render;
  }

  return (
    <Card 
      variant="outlined"
      className="scrolling"
      style={{
        overflowY: "auto",
        height: "500px",
        width: "100%",
      }}
    >
      {getOngoingTodos()}
    </Card>
  );
}