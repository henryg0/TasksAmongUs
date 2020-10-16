import React from 'react';
import Layout from '../../components/Layout';
import authenticate from '../../utils/authenticate';
import Productivity from './Productivity';
import TodoList from './TodoList';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function Profile() {
  let user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={10} md={8}>
            <h2>Productivity</h2>
            <Productivity />
          </Grid>
          <Grid container item xs={10} md={4} direction="column" justify="flex-start">
            <Grid container>
              <Grid item xs>
                <h2>
                  TodoList {" "}
                  <Fab color="primary" aria-label="edit" href="/create" className="mb-1 mt-1" size="small">
                    <AddIcon className="white-text" />
                  </Fab>
                </h2>
              </Grid>
            </Grid>
            <Grid item xs><TodoList user={user}/></Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}