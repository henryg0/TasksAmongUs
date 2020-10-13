import React from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Layout from '../components/Layout';
import authenticate from '../utils/authenticate';
import Grid from '@material-ui/core/Grid';

import Vincent from '../images/vincent.jpg';
import Henry from '../images/henry.jpg';
import Maxwell from '../images/maxwell.png';

export default function About() {
  const user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <Grid container direction="column" alignItems="center">
          <h1>About Our Mission</h1>
          <Grid container item direction="column" xs="10" md="7">
            <hr />
            <br />
            <Grid item xs="12">
              <p>
                We wanted a way for friends to keep each other accountable over their goals, 
                especially with current circumstances.....
              </p>
              <br />
            </Grid>
            <Grid item xs="12">
              <h3 className="mb-3">
                And thus <i>TasksAmongUs</i> was born!!!!!
              </h3>
              <br />
            </Grid>
            <Grid item xs="12">
              <p>
                At its core, TasksAmongUs is a todo list app but with a twist. Whenever you fail to 
                meet a deadline, an embarassing notification is sent to all your friends letting
                them how unresponsible you are. OOF. Having *<i>good</i>* *<i>responsible</i>* friends tease
                you slacking off would hopefully motivate you to finish your them next time!
              </p>
              <br />
            </Grid>
            <Grid item xs="12">
              <p>
                TasksAmong is all in good fun and we hope to bring a chuckle or a laugh when
                carrying out your day-to-day tasks. It also serves as a reminder to check in on your friends,
                no matter how busy you are. We hope you enjoy our app as much as we enjoyed
                making it!
              </p>
              <br />
            </Grid>
            <Grid item xs="12">
              <h3>Sincerely, The TasksAmongUs {"Team <3"}</h3>
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
      </Container>
    </Layout>
  )
}