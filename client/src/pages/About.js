import React from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Layout from '../components/Layout';
import authenticate from '../utils/authenticate';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Vincent from '../images/vincent.jpg';
import Henry from '../images/henry.jpg';
import Maxwell from '../images/maxwell.png';

export default function About() {
  const user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <Grid container direction="column" alignItems="center" style={{width: "100%"}}>
          <h1>About Our Mission</h1>
          <Grid container item direction="column" xs="10" md="5">
          <Divider />
          <br />
            <Grid item xs="12">
              <p>
                We wanted a way for friends to keep each other accountable over 
                their goals, especially during quarentine.....
              </p>
              <br />
            </Grid>
            <Grid item xs="12">
              <h3 className="mb-3">
                So <i>TasksAmongUs</i> was born!!!!!
              </h3>
              <br />
            </Grid>
            <Grid item xs="12">
              <p>
                TasksAmongUs is a productivity app where you can interact with friends.
                COMPLETE todos that your friends can see or FAIL goals that your friends
                can tease you for. You can flex or get flexed on.
              </p>
              <br />
            </Grid>
            <Grid item xs="12">
              <p>
                Whether it's browsing through your home page to see what your friends are
                up to or earning customizations through achievements, TasksAmongUs hopes
                to keep you productive. Or.. at least bring a smile to your face!
              </p>
              <br />
            </Grid>
            <Grid>
              <p>
                We hope you enjoy our app as much as we enjoyed making it. So please, if
                you have any ideas of what you'd like to see, let us know!
              </p>
              <br />
            </Grid>
            <Grid item xs="12">
              <h3>Sincerely, The TasksAmongUs Team {"<3"}</h3>
            </Grid>
              <hr />
              <br />
          </Grid>
          <Grid container xs="10" md="5">
            <Grid item xs="4" className="text-center">
              <Image 
                className="mr-1 mb-1"
                roundedCircle
                src={Vincent}
                width={140}
              />
              <h5 className="mb-0">Vincent Tieu</h5>
              <i>Frontend Developer</i>
            </Grid>
            <Grid item xs="4" className="text-center">
              <Image 
                className="mr-1 mb-1"
                roundedCircle
                src={Henry}
                width={140}
              />
              <h5 className="mb-0">Henry Gip</h5>
              <i>Backend Developer</i>
            </Grid>
            <Grid item xs="4" className="text-center">
              <Image
                className="mr-1 mb-1"
                roundedCircle
                src={Maxwell}
                width={140}
                height={140}
              />
              <h5 className="mb-0">Maxwell Wong</h5>
              <i>Backend Developer</i>
            </Grid>
          </Grid>
        </Grid>
        <br />
      </Container>
    </Layout>
  )
}