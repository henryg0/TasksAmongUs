import React from 'react';
import Layout from '../../components/Layout';
import Border from '../../components/Border';
import authenticate from '../../utils/authenticate';
import getGreeting from '../../utils/get.greeting';
import TodoList from './TodoList';
import WeeklyChart from './WeeklyChart';
import AllTimeChart from './AllTimeChart';
import Badge from '../../components/Badge';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

export default function Profile() {
  let user = authenticate();

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10} md={8}>
            <h5 className="mt-2 text-secondary">{getGreeting(user)}</h5>
            <Card
              className="p-2 mb-2 mt-2"
              variant="outlined"
              style={{
                overflowY: "auto",
                maxHeight: "470px",
                height: "470px",
              }}
            >
              <Grid container>
                <Grid item xs={4} sm={3} md={2} className="p-2">
                  <Border borderThickness={5}>
                    <Avatar src={user.imageUrl} style={{width: "100px", height: "100px"}} />
                  </Border>
                </Grid>
                <Grid item xs={8} sm={9} md={10} className="p-2">
                  <h3>
                    {user.fullName} {" "}
                    <Badge />
                  </h3>
                  <Button variant="contained" color="primary">Customize</Button>
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <Grid item xs={12} md={9}>
                  <h3 className="text-center">Weekly Progress</h3>
                  <div style={{height: "200px"}}><WeeklyChart /></div>
                </Grid>
                <Grid item xs={12} md={3}>
                <h3 className="text-center">All Time Progress</h3>
                  <div style={{height: "150px"}}><AllTimeChart /></div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid container item xs={10} md={4} direction="column" justify="flex-start">
            <Grid container>
              <Grid item xs>
                <h2>
                  TodoList {" "}
                  <Fab color="primary" aria-label="edit" href="/create" className="mb-1 mt-1" size="small">
                    <AddIcon className="white-text" />
                  </Fab>
                </h2>
              </Grid>
            </Grid>
            <Grid item xs>
              <TodoList user={user}/>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}