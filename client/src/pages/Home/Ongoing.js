import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import OngoingTodo from './OngoingTodo';

export default function Ongoing(props) {
  const  { user } = props;
  const [ongoingTodos, setOngoingTodos] = useState([{selectedBorder: "BLACK"}]);

  useEffect(() => {
    axios.get(`/api/user/${user.id}/todo/upcoming`)
      .then((res) => {
        if (res.data.err) {
          console.log(res.data.error);
        } else {
          // console.log(res.data.todos);
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
    if (ongoingTodos.length === 0) {
      render.push(
        <OngoingTodo 
          fullName={"Not Sus"}
          profileUrl={"https://i.imgur.com/rVBs09J.jpg"}
          selectedBadge={"GAMER"}
          selectedBorder={"SEAWEED_GREEN"}
          todoName={"DISCUSS!"}
          dueDate={new Date()}
          description={
            <div>
              You're looking at the "ongoing" section of the home page
              which shows the ongoing todos of you and your friends.
              When todos are completed/failed, they are automatically
              move into the "completed/failed" tab.
              Add some friends to see what they're up to!
              <br/>
              <br/>
              <video autoPlay loop playsInline muted style={{width: "100%", maxWidth:"300px"}}>
                <source src={"https://i.imgur.com/pDfJHys.mp4"} type="video/mp4" />
              </video>
            </div>
          }
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
      {getOngoingTodos()}
    </Card>
  );
}