import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import ProfileTodo from './ProfileTodo';
import axios from 'axios';

export default function TodoList(props) {
  let { user, renderInCounter, selectedBadge, selectedBorder, selectedCelebration} = props;
  const [profileTodos, setProfileTodos] = useState([]);
  useEffect(() => {
    axios.get(`/api/user/${user.id}/todo`)
      .then((res) => {
        // not new object
        // console.log(res)
        setProfileTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function getProfileTodos() {
    let result = [];
    for (let idx = 0; idx < profileTodos.length; idx++) {
      result.push(
        <ProfileTodo 
          user={user}
          todoId={profileTodos[idx].todoId}
          todoName={profileTodos[idx].todoName}
          dueDate={profileTodos[idx].dueDate}
          description={profileTodos[idx].description}
          imageUrl={profileTodos[idx].imageUrl}
          handleDelete={handleDelete}
          idx={idx}
          key={idx}
          renderInCounter={renderInCounter}
          selectedBadge={selectedBadge}
          selectedBorder={selectedBorder}
          selectedCelebration={selectedCelebration}
        />
      );
    }

    if (result.length === 0) {
      result.push(
        <Card 
          style={{height: "200px", display: "flex", flexDirection: "column", justifyContent: "center"}}
          elevation={0}
          key={-1}
        >
          <h2 className="w3-animate-opacity text-secondary text-center" style={{animationDuration: "3s"}}>No More Todos!</h2>
          <h2 className="w3-animate-opacity text-secondary text-center" style={{animationDuration: "3s"}}>Create Some :)</h2>
        </Card>
      )
    }
    return result;
  }

  const handleDelete = (idx) => {
    let newTodos = [...profileTodos];
    newTodos.splice(idx, 1);
    setProfileTodos(newTodos);
  }

  return (
    <Card 
      variant="outlined"
      style={{
        overflowY: "auto",
        maxHeight: "600px",
        height: "600px",
        width: "100%"
      }}
      className="mb-2 scrolling"
    >
      {getProfileTodos()}
    </Card>
  );
}
