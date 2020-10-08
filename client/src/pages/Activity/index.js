import React from 'react';

import authenticate from '../../utils/authenticate';
import Layout from '../../components/Layout';
import Activity from './Activity';
import FindFriends from './FindFriends';
import Container from 'react-bootstrap/Container';

export default function Profile() {
  let user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <div id="home">
          <div id="activity-column">
            <Activity />
          </div>
          <div id="friends-column">
            <FindFriends />
          </div>
        </div>
      </Container>
    </Layout>
  )
}