import React from 'react';

import Layout from '../components/Layout';
import authenticate from '../utils/authenticate';
import Container from 'react-bootstrap/esm/Container';

export default function Profile() {
  let user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <div>this is my profile xD</div>
      </Container>
    </Layout>
  )
}