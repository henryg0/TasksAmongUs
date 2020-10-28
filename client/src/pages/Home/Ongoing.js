import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import OngoingTodo from './OngoingTodo';

export default function Ongoing(props) {
  const  { user } = props;
  const [ongoingTodos, setOngoingTodos] = useState([]);

  // useEffect(() => {
  //   axios.get(`/api/user/${user.id}/todo/upcoming`)
  //     .then((res) => {
  //       if (res.data.err) {
  //         console.log(res.data.error);
  //       } else {
  //         console.log(res.data.todos);
  //         setOngoingTodos(res.data.todos);
  //       }
  //     }) 
  // }, [])

  function getOngoingTodos() {
    let render = [];
    for (let i = 0; i < ongoingTodos.length; i++) {
      render.push(
        <OngoingTodo 
          userId={ongoingTodos[i].userId}
          todoId={ongoingTodos[i].todoId}
          todoName={ongoingTodos[i].todoName}
          completedDate={ongoingTodos[i].completedDate}
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
        height: "450px",
        width: "100%",
      }}
    >
    {getOngoingTodos()}
    </Card>
  );
}