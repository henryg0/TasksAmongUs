import React from 'react';

import Layout from '../components/Layout';
import authenticate from '../utils/authenticate';
import Container from 'react-bootstrap/esm/Container';

export default function Profile() {
  let user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <h1>Todos</h1>
        <p>This is the todo page where I make and edit todos!</p>
      </Container>
    </Layout>
  )
}