import React from "react";
import Container from "react-bootstrap/Container";

import Layout from "../components/Layout";
import authenticate from "../utils/authenticate";

export default function Template() {
  const user = authenticate();

  return (
    // pass in 'user' to 'Layout' for navbar
    <Layout user={user}>
      <Container>
        {/* pass user to main content of the page for user info */}
        <div>
          {user && (
            <pre>{JSON.stringify(user, null, "\t")}</pre>
          )}
        </div>
      </Container>
    </Layout>
  )
}