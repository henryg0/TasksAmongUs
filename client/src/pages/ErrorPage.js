import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Route } from 'react-router-dom'

import Layout from "../components/Layout";
import authenticate from "../utils/authenticate";

export default function ErrorPage() {
  const user = authenticate();


  return (
    <Layout user={user}>
      <Container className="text-center">
        <h3>
          The page you've requested does not exist :( {" "}
        </h3>
        <Route render={({ history}) => (
          <Button
            onClick={() => { history.push('/') }}
            // size="lg"
          >
            Return
          </Button>
        )} />
      </Container>
    </Layout>
  )
}