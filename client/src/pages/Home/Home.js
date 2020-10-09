import React from 'react';

import authenticate from '../../utils/authenticate';
import Layout from '../../components/Layout';
import Activity from './Activity';
import AddNewFriendForm from './AddNewFriendForm';
import FriendRequests from './FriendRequests';
import PendingRequests from './PendingRequests';
import ConfirmedRequests from './ConfirmedRequests';
import Container from 'react-bootstrap/Container';
import Grid from '@material-ui/core/Grid';

export default function Home() {
  let user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <Grid container direction="row" spacing={3}>
          <Grid item xs="12" md="9">
            <h2>Activity</h2>
            <Activity />
          </Grid>
          <Grid item xs="12" md="3">
            <h2>Friends</h2>
            <AddNewFriendForm />
            <FriendRequests />
            <PendingRequests />
            <ConfirmedRequests />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}