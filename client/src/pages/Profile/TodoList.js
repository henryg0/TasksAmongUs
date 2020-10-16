import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import ProfileTodo from './ProfileTodo';
import axios from 'axios';

export default function TodoList(props) {
  let { user } = props;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/api/user/" + user.id + "/todo")
      .then((res) => {
        // not new object
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function getTodos() {
    let result = [];
    for (let idx = 0; idx < todos.length; idx++) {
      result.push(
        <ProfileTodo 
          user={user}
          todoId={todos[idx].todoId}
          todoName={todos[idx].todoName}
          dueDate={todos[idx].dueDate}
          description={todos[idx].description}
          imageUrl={todos[idx].imageUrl}
          handleDelete={handleDelete}
          idx={idx}
        />
      );
    }
    return result;
  }

  const handleDelete = (idx) => {
    let newTodos = [...todos];
    newTodos.splice(idx, 1);
    setTodos(newTodos);
  }

  return (
    <Card 
      variant="outlined"
      style={{
        overflowY: "auto",
        maxHeight: "450px",
        height: "450px",
        width: "100%"
      }}
      className="mb-2"
    >
      {getTodos()}
    </Card>
  );
}
