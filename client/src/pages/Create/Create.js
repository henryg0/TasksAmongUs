import React, { useState } from 'react';
import Layout from '../../components/Layout';
import authenticate from '../../utils/authenticate';
import CreateForm from './CreateForm';

import Container from 'react-bootstrap/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function Todos() {
  let user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs="10" md="8">
            <h2>
              <Button className="mb-2 mr-1" variant="contained" color="primary" size="small">
                &#x3c;
              </Button>
              Create
            </h2>
            <CreateForm />
          </Grid>
          <Grid item xs="10" md="4">
            <h2>Templates</h2>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}