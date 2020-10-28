import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import FinishedTodo from './FinishedTodo';

export default function Unfinished(props) {
  const  { user } = props;
  const [finishedTodos, setFinishedTodos] = useState([]);

  useEffect(() => {
    axios.get(`/api/user/${user.id}/todo/finish`)
      .then((res) => {
        if (res.data.err) {
          console.log(res.data.error);
        } else {
          console.log(res.data.todos);
          setFinishedTodos(res.data.todos);
        }
      }) 
  }, [])

  function getFinishedTodos() {
    let render = [];
    for (let i = 0; i < finishedTodos.length; i++) {
      render.push(
        <FinishedTodo 
          userId={finishedTodos[i].userId}
          todoId={finishedTodos[i].todoId}
          todoName={finishedTodos[i].todoName}
          completedDate={finishedTodos[i].completedDate}
          description={finishedTodos[i].description}
          imageUrl={finishedTodos[i].imageUrl}
          status={finishedTodos[i].status}
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
        height: "450px",
        width: "100%",
      }}
    >
    {getFinishedTodos()}
    </Card>
  );
}