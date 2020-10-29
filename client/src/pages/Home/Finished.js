import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import FinishedTodo from './FinishedTodo';

export default function Unfinished(props) {
  const  { user } = props;
  const [finishedTodos, setFinishedTodos] = useState([{selectedBorder: "BLACK"}]);

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
          fullName={finishedTodos[i].fullName}
          profileUrl={finishedTodos[i].profileUrl}
          selectedBadge={finishedTodos[i].selectedBadge}
          selectedBorder={finishedTodos[i].selectedBorder}
          selectedCelebration={finishedTodos[i].selectedCelebration}
          // todoId={finishedTodos[i].todoId}
          todoName={finishedTodos[i].todoName}
          completedDate={finishedTodos[i].completedDate}
          description={finishedTodos[i].description}
          imageUrl={finishedTodos[i].imageUrl}
          status={finishedTodos[i].status}
          // idx={i}
          key={i}
        />
      )
    }

    if (finishedTodos.length === 0) {
      render.push(
        <FinishedTodo 
          fullName={"Obviously Not An Imposter"}
          profileUrl={"https://i.imgur.com/rVBs09J.jpg"}
          selectedBadge={"GAMER"}
          selectedBorder={"SEAWEED_GREEN"}
          completedDate={new Date()}
          todoName={"DISCUSS!"}
          description={
            <div>
              Howdy! You're looking at is the "completed/failed" section of the home page which
              shows the completed/failed todos of you and your friends.
              Whenever a todo is completed, it'll go here with your awesome "celebration" GIF.
              HOWEVER, should you fail a todo, your failure postcard will be posted instead.

              Add some friends to see what they're up to!
            </div>
          }
          imageUrl={"https://i.imgur.com/n3PLKQz.jpg"}
          key={-1}
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
        height: "600px",
        width: "100%",
      }}
    >
      {getFinishedTodos()}
    </Card>
  );
}