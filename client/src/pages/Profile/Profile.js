import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import TodoList from './TodoList';
import { displayBadges, displayBorders, displayCelebrations } from './DisplayCustomizations';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import authenticate from '../../utils/authenticate';
import getGreeting from '../../utils/get.greeting';
import getBadges from '../../utils/get.badges';
import getBorders from '../../utils/get.borders';

import WeeklyChart from './WeeklyChart';
import AllTimeChart from './AllTimeChart';
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
  let badges = getBadges();
  let borders = getBorders();
  const { enqueueSnackbar } = useSnackbar();
  let [greeting, setGreeting] = useState("");

  let [selectedBadge, setSelectedBadge] = useState("none");
  let [selectedBorder, setSelectedBorder] = useState("none");
  let [selectedCelebration, setSelectedCelebration] = useState("AMONG US WIN");
  let [unlockedBadges, setUnlockedBadges] = useState({"NORMIE": true})
  let [unlockedBorders, setUnlockedBorders] = useState({"BLACK": true})
  let [unlockedCelebrations, setUnlockedCelebrations] = useState({"AMONG US WIN": true})

  let [allTimeCompleted, setAllTimeCompleted] = useState(0);
  let [allTimeFailed, setAllTimeFailed] = useState(0);
  let [weeklyProgress, setWeeklyProgress] = useState([{}, {}, {}, {}, {}, {}, {}]);
  let [counter, setCounter] = useState(0);

  useEffect(() => {
    setGreeting(getGreeting(user));
    axios.get(`/api/user/${user.id}`)
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          if (res.data.user.selectedBadge) {
            setSelectedBadge(res.data.user.selectedBadge);
          } else {
            setSelectedBadge("NORMIE");
          }
          if (res.data.user.selectedBorder) {
            setSelectedBorder(res.data.user.selectedBorder);
          } else {
            setSelectedBorder("BLACK");
          }
          if (res.data.user.selectedCelebration) {
            setSelectedCelebration(res.data.user.selectedCelebration);
          } else {
            setSelectedCelebration("AMONG US WIN")
          }
          // if (customizations.unlockedBadges) {
          //   setUnlockedBadges(customizations.unlockedBadges);
          // }
          // if (customizations.unlockedBorders) {
          //   setUnlockedBorders(customizations.unlockedBorders);
          // }
          // if (customizations.unlockedCelebrations) {
          //   setUnlockedCelebrations(customizations.unlockedCelebrations);
          // }
          setAllTimeCompleted(res.data.user.finishedTodos);

        }
      })
      .catch((err) => {
        console.log(err);
      })
    setAllTimeFailed(1);

    axios.get(`/api/user/${user.id}/weekly`)
      .then((res) => {
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setWeeklyProgress(res.data.todos);
          console.log(res.data.todos)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function updateSelectedBadge(selectedBadge) {
    const data = {
      "selectedBadge": selectedBadge
    };

    axios.put(`/api/user/${user.id}/selected/badge/update`, data)
      .then((res) => {
        console.log(res);
        enqueueSnackbar("Badge Changed", {variant: "success"})
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Badge Failed To Change", {variant: "error"})
      })
  }

  function updateSelectedBorder(selectedBorder) {
    const data = {
      "selectedBorder": selectedBorder
    };

    axios.put(`/api/user/${user.id}/selected/border/update`, data)
      .then((res) => {
        console.log(res);
        enqueueSnackbar("Border Changed", {variant: "success"})
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Border Failed To Change", {variant: "error"})
      })
  }

  function updateSelectedCelebration(selectedCelebration) {
    const data = {
      "selectedCelebration": selectedCelebration
    };

    axios.put(`/api/user/${user.id}/selected/celebration/update`, data)
      .then((res) => {
        console.log(res);
        enqueueSnackbar("Celebration Changed", {variant: "success"})
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Celebration Failed To Change", {variant: "error"})
      })
  }

  function renderInCounter() {
    setCounter(counter + 1);
  }

  return (
    <Layout user={user}>
      <Container>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={11} md={7}>
            <h5 className="mt-2 text-secondary">{greeting}</h5>
            <Card
              className="p-2 mb-2 mt-2"
              variant="outlined"
            >
              <Grid container direction="row" justify="center">
                <Grid item xs="auto" lg={3} className="p-2">
                  <div className={borders[selectedBorder].root}>
                    <Avatar src={user.imageUrl} style={{width: "100px", height: "100px"}} />
                  </div>
                </Grid>
                <Grid container item direction="column" xs={12} md={6} lg={7} className="text-center text-lg-left" justify="center">
                  <h4>{user.fullName}</h4>
                  <h4>{badges[selectedBadge]}</h4>
                  <Modal
                    icon={BuildIcon}
                    component={
                      ({onClose}) => {
                        return (
                          <Card
                            className="p-2 text-center"
                            style={{
                              width: "90%",
                              height: "85vh",
                              overflowY: "auto",
                            }}
                          >
                            <Grid container direction="column" justify="space-between" style={{height: "100%"}}>
                              <h2>Customize</h2>
                              <Grid container alignItems="stretch">
                                <Card
                                  style={{
                                    overflowY: "auto",
                                    height: "65vh",
                                  }}
                                  elevation={0}
                                >
                                  <h5>Badges</h5>
                                  <Grid container direcion="row" justify="center">
                                    <RadioGroup required value={selectedBadge} 
                                      onChange={(e) => {
                                        setSelectedBadge(e.target.value);
                                        updateSelectedBadge(e.target.value);
                                        onClose();
                                      }}
                                    >
                                      <Grid item>{displayBadges(unlockedBadges)}</Grid>
                                    </RadioGroup>
                                  </Grid>
                                  <br />
                                  <h5>Borders</h5>
                                  <Grid container direcion="row" justify="center">
                                    <RadioGroup required value={selectedBorder}
                                      onChange={(e) => {
                                        setSelectedBorder(e.target.value);
                                        updateSelectedBorder(e.target.value);
                                        onClose();
                                      }}
                                    >
                                      <Grid item>{displayBorders(unlockedBorders)}</Grid>
                                    </RadioGroup>
                                  </Grid>
                                  <br />
                                  <h5>Celebrations</h5>
                                  <Grid container direcion="row" justify="center">
                                    <RadioGroup required value={selectedCelebration} 
                                      onChange={(e) => {
                                        setSelectedCelebration(e.target.value);
                                        updateSelectedCelebration(e.target.value);
                                        onClose();
                                      }}
                                    >
                                      <Grid item>{displayCelebrations(unlockedCelebrations)}</Grid>
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
              <br />
              <Grid container>
                <Grid item xs={12} md={9}>
                  <h3 className="text-center">Weekly Progress</h3>
                  <div style={{height: "200px"}}>
                    <WeeklyChart 
                      weeklyProgress={weeklyProgress}
                      counter={counter}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={3}>
                <h3 className="text-center">All Time Progress</h3>
                  <div style={{height: "150px"}}><AllTimeChart allTimeCompleted={allTimeCompleted + counter} allTimeFailed={allTimeFailed} /></div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid container item xs={11} md={5} direction="column" justify="flex-start">
            <h2>
              TodoList {" "}
              <Fab color="primary" aria-label="edit" href="/create" className="mb-1 mt-1" size="small">
                <AddIcon className="white-text" />
              </Fab>
            </h2>
            <TodoList user={user} 
              renderInCounter={renderInCounter}
              selectedBadge={selectedBadge}
              selectedBorder={selectedBorder}
              selectedCelebration={selectedCelebration} 
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}