import React, { useState } from 'react';
import Layout from '../../components/Layout';
import authenticate from '../../utils/authenticate';
import CreateForm from './CreateForm';
import Templates from './Templates';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function Todos() {
  let user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs="10" md="9">
            <h2>
              <Button className="mb-2 mr-2" variant="contained" color="primary" href="/todos" size="small">
                <div className="text-white">
                  &#x3c;
                </div>
              </Button>
              Create
            </h2>
            <CreateForm />
          </Grid>
          <Grid item xs="10" md="3">
            <h2>Templates</h2>
            <Templates />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}