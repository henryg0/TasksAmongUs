import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Border from '../../components/Border';
import Modal from '../../components/Modal';
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
import RadioGroup from '@material-ui/core/RadioGroup';
import BuildIcon from '@material-ui/icons/Build';

export default function Profile() {
  let user = authenticate();

  let [allTimeCompleted, setAllTimeCompleted] = useState(0);
  let [allTimeFailed, setAllTimeFailed] = useState(0);

  let [dayOne, setDayOne] = useState({date: "Sun", completed: 0, failed: 0});
  let [dayTwo, setDayTwo] = useState({date: "Sat", completed: 0, failed: 0});
  let [dayThree, setDayThree] = useState({date: "Fri", completed: 0, failed: 0});
  let [dayFour, setDayFour] = useState({date: "Thur", completed: 0, failed: 0});
  let [dayFive, setDayFive] = useState({date: "Wed", completed: 0, failed: 0});
  let [daySix, setDaySix] = useState({date: "Tue", completed: 0, failed: 0});
  let [daySeven, setDaySeven] = useState({date: "Mon", completed: 0, failed: 0});

  function renderInCompletedCount() {
    setAllTimeCompleted(allTimeCompleted + 1);
    setDayOne({date: dayOne.date, completed: dayOne.completed + 1, failed: dayOne.failed});
  }

  useEffect(() => {
    // axios.get(`/api/user/${user.id}/friend/pending`)
    //   .then((res) => {
    //       if (res.data.error) {
    //         console.log(res.data.error);
    //       } else {
    //         // console.log(res.data.pending);
    //         setPendingRequests(res.data.pending);
    //       }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    setAllTimeCompleted(400);
    setAllTimeFailed(40);
    setDayOne({date: "Sun", completed: 2, failed: 1});
    setDayTwo({date: "Sat", completed: 6, failed: 0});
    setDayThree({date: "Fri", completed: 2, failed: 0});
    setDayFour({date: "Thu", completed: 5, failed: 2});
    setDayFive({date: "Wed", completed: 1, failed: 0});
    setDaySix({date: "Tue", completed: 0, failed: 1});
    setDaySeven({date: "Mon", completed: 4, failed: 0});
  }, [])

  return (
    <Layout user={user}>
      <Container>
        <Grid container justify="center">
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
              <Grid container direction="row" justify="center">
                <Grid item xs={4} lg={3} className="p-2">
                  <Grid container item direction="row">
                    <Border borderThickness={5}>
                      <Avatar src={user.imageUrl} style={{width: "100px", height: "100px"}} />
                    </Border>
                    <Modal
                      icon={BuildIcon}
                      component={
                        ({onClose}) => {
                          return (
                            <Card 
                              className="p-2 text-center"
                              style={{
                                width: "80%",
                                height: "90vh",
                                overflowY: "auto",
                              }}
                            >
                              <Grid container direction="column" justify="space-between" style={{height: "100%"}}>
                                <h2>Customize</h2>
                                <Grid container alignItems="stretch">
                                  <Card
                                    style={{
                                      overflowY: "auto",
                                    }}
                                    elevation={0}
                                  >
                                    <Grid container direcion="row">
                                      <RadioGroup required value={/*imageUrl*/ "test"} onChange={(e) => {
                                        // setImageUrl(e.target.value)
                                      }}
                                        onClick={onClose}>
                                        {/* <Grid item>{getBackground()}</Grid> */}
                                      </RadioGroup>
                                    </Grid>
                                  </Card>
                                </Grid>
                                <Button className="mt-2" fullWidth onClick={onClose} variant="outlined">Close</Button>
                              </Grid>
                            </Card>
                          )
                        }
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container item direction="column" xs={12} md={6} lg={7} className="text-center text-md-left" justify="center">
                  <h4>{user.fullName}</h4>
                  <h4><Badge /></h4>
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <Grid item xs={12} md={9}>
                  <h3 className="text-center">Weekly Progress</h3>
                  <div style={{height: "200px"}}>
                    <WeeklyChart 
                      dayOne={dayOne}
                      dayTwo={dayTwo}
                      dayThree={dayThree}
                      dayFour={dayFour}
                      dayFive={dayFive}
                      daySix={daySix}
                      daySeven={daySeven}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={3}>
                <h3 className="text-center">All Time Progress</h3>
                  <div style={{height: "150px"}}><AllTimeChart allTimeCompleted={allTimeCompleted} allTimeFailed={allTimeFailed} /></div>
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
              <TodoList user={user} renderInCompletedCount={renderInCompletedCount} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}