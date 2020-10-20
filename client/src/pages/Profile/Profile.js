import React from 'react';
import Layout from '../../components/Layout';
import authenticate from '../../utils/authenticate';
import TodoList from './TodoList';
import Chart from './Chart';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function Profile() {
  let user = authenticate();

  function getGreeting() {
    let greetings = [
      `HELLO ${user.firstName.toUpperCase()}!!!`,
      `Welcome Back, ${user.firstName}!`,
      `YOOOO IT'S ${user.firstName.toUpperCase()}!!!!`,
      `Shoot for the stars, ${user.firstName}!`,
      `YEEHAW, ${user.firstName.toUpperCase()}!`,
      `Back Already, ${user.firstName}?!`,
      `Keep Your Head Up, ${user.firstName}!`,
      `Warm Welcomes, ${user.firstName}!`,
      `Greetings, ${user.firstName}!`,
      `Fight On, ${user.firstName}!`,
      `What's Cooking, ${user.firstName}?!`,
      `It's Go Time, ${user.firstName}!`,
      `Time to get going, ${user.firstName}!`,
      `Work Work Work, ${user.firstName}!`,
      `It's Morphing Time, ${user.firstName}!`,
      `Let's Get Cracking, ${user.firstName}!`,
      `Spice It Up, ${user.firstName}!`,
      `Finish Strong, ${user.firstName}!`,
      `Back from your travels, ${user.firstName}?`,
      `Into the abyss, ${user.firstName}....`,
      `Making good progress, ${user.firstName}!`,
      `Stay Speedy, ${user.firstName}!`,
      `OKAAAAYYY, ${user.firstName.toUpperCase()} IS BACK!`,
      `Speed racer ${user.firstName} here!`,
      `Looking Good, ${user.firstName}!`,
      `Get that bread, ${user.firstName}!`,
      `Captain ${user.firstName} reporting for duty!`,
      `The world is your oyster, ${user.firstName}!`,
      `${user.fullName}: (╯°□°)╯︵ ┻━┻`,
      `${user.fullName}: ᕦ( ᐛ )ᕤ`,
      `${user.fullName}: ᕕ( ᐛ )ᕗ`,
      `${user.fullName}: ᐠ( ᐛ )ᐟ`,
      `${user.fullName}: ＼＼\(۶ ᐛ )۶//／／`,
      `${user.fullName}: 三三ᕕ( ᐛ )ᕗ`,
      `${user.fullName}: ♪♪(oᐛ)o～♪♪`,
      `${user.fullName}: ♪♪♪ ヽ( ᐖゞ)`,
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  return (
    <Layout user={user}>
      <Container>
        <Grid container spacing={3} justify="center">
          <Grid item xs={10} md={8}>
            <h2 className="mt-1">{getGreeting()}</h2>
            <Card
              className="p-2 mb-2"
              variant="outlined"
              style={{
                overflowY: "auto",
                maxHeight: "450px",
                height: "450px",
              }}
            >
              <Chart /> 
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