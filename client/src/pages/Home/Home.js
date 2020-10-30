import React, { useState, useEffect } from 'react';
import authenticate from '../../utils/authenticate';
import Layout from '../../components/Layout';
import Ongoing from './Ongoing';
import Finished from './Finished';
import FriendsSection from './FriendsSection';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function Home() {
  let user = authenticate();
  const [homeToggle, setHomeToggle] = useState(1);

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3} justify="center" className="mb-2">
          <Grid item xs={10} md={9}>
            {homeToggle ?
              <div>
                <Button className="mt-2 mb-2 mr-2" variant="contained" color="primary" size="large">
                  Ongoing
                </Button>
                <Button className="mt-2 mb-2" variant="outlined" color="primary" size="large" onClick={() => setHomeToggle(0)}>
                  Completed/Failed
                </Button>
                <Ongoing user={user} />
              </div> :
              <div>
                <Button className="mt-2 mb-2 mr-2" variant="outlined" color="primary" size="large" onClick={() => setHomeToggle(1)}>
                  Ongoing
                </Button>
                <Button className="mt-2 mb-2" variant="contained" color="primary" size="large">
                  Completed/Failed
                </Button>
                <Finished user={user} />
              </div>
            }
          </Grid>
          <Grid item xs={10} md={3}>
            <h2>Friends</h2>
            <FriendsSection user={user} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}