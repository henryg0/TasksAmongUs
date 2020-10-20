import React, { useState } from 'react';
import authenticate from '../../utils/authenticate';
import Layout from '../../components/Layout';
import Unfinished from './Unfinished';
import Finished from './Finished';
import SendFriendRequest from './SendFriendRequest';
import FriendRequestsList from './FriendRequestsList';
import PendingRequestsList from './PendingRequestsList';
import FriendsList from './FriendsList';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function Home() {
  let user = authenticate();
  const [homeToggle, setHomeToggle] = useState(1);

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10} md={9}>
            {homeToggle ?
              <div>
                <Button className="mt-2 mb-2 mr-2 lg-btn" variant="contained" color="primary" size="large">
                  Unfinished
                </Button>
                <Button className="mt-2 mb-2 lg-btn" variant="outlined" color="primary" size="large" onClick={() => setHomeToggle(0)}>
                  Finished
                </Button>
                <Unfinished />
              </div> :
              <div>
                <Button className="mt-2 mb-2 mr-2 lg-btn" variant="outlined" color="primary" size="large" onClick={() => setHomeToggle(1)}>
                  Unfinished
                </Button>
                <Button className="mt-2 mb-2 lg-btn" variant="contained" color="primary" size="large">
                  Finished
                </Button>
                <Finished />
              </div>
            }
          </Grid>
          <Grid item xs={10} md={3}>
            <h2>Friends</h2>
            <SendFriendRequest user={user} />
            <FriendRequestsList user={user}/>
            <PendingRequestsList user={user} />
            <FriendsList user={user} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}