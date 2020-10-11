import React, { useState } from 'react';
import Layout from '../../components/Layout';
import authenticate from '../../utils/authenticate';
import Productivity from './Productivity';
import TodoList from './TodoList';

import Container from 'react-bootstrap/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function Profile() {
  let user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs="10" md="8">
            <h2>Productivity</h2>
            <Productivity />
          </Grid>
          <Grid container item xs="10" md="4" direction="row" alignItems="center" justify="flex-end">
              <Grid item xs>
                <h2>TodoList</h2>
              </Grid>
              <Grid item xs="6">
                <Button className="mb-1" variant="contained" color="primary" fullWidth href="/create">
                  <div className="white-text">Create Todo</div>
                </Button>
              </Grid>
            <TodoList />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}