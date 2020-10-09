import React, { useState } from 'react';
import Layout from '../../components/Layout';
import authenticate from '../../utils/authenticate';
import CreateTodo from './CreateTodo';
import Progress from './Progress';
import TodoList from './TodoList';

import Container from 'react-bootstrap/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function Todos() {
  let user = authenticate();
  const [todosToggle, setTodosToggle] = useState(1);
  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs="10" md="8">
            {todosToggle ?
              <div>
                <Button className="mb-2 mr-2 lg-btn" variant="contained" color="primary" size="large">
                  Create Todo
                </Button>
                <Button className="mb-2 lg-btn" variant="outlined" color="primary" size="large" onClick={() => setTodosToggle(0)}>
                  Progress
                </Button>
                <CreateTodo />
              </div> :
              <div>
                <Button className="mb-2 mr-2 lg-btn" variant="outlined" color="primary" size="large" onClick={() => setTodosToggle(1)}>
                  Create Todo
                </Button>
                <Button className="mb-2 lg-btn" variant="contained" color="primary" size="large">
                  Progress
                </Button>
                <Progress />
              </div>
            }
          </Grid>
          <Grid item xs="10" md="4">
            <h2>TodoList</h2>
            <TodoList />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}