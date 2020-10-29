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
import getCelebrations from '../../utils/get.celebrations';
import checkAchievements from '../../utils/check.achievements';

import WeeklyChart from './WeeklyChart';
import AllTimeChart from './AllTimeChart';
import NoTimeChart from './NoTimeChart';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import BuildIcon from '@material-ui/icons/Build';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function Profile() {
  let user = authenticate();
  let badges = getBadges();
  let borders = getBorders();
  let celebrations = getCelebrations();
  const { enqueueSnackbar } = useSnackbar();
  let [greeting, setGreeting] = useState("");

  let [selectedBadge, setSelectedBadge] = useState("none");
  let [selectedBorder, setSelectedBorder] = useState("none");
  let [selectedCelebration, setSelectedCelebration] = useState("AMONG_US_WIN");
  let [unlockedBadges, setUnlockedBadges] = useState({"NORMIE": true})
  let [unlockedBorders, setUnlockedBorders] = useState({"BLACK": true})
  let [unlockedCelebrations, setUnlockedCelebrations] = useState({"AMONG_US_WIN": true})

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
          setSelectedBadge(res.data.user.selectedBadge);
          setSelectedBorder(res.data.user.selectedBorder);
          setSelectedCelebration(res.data.user.selectedCelebration);
          setUnlockedBadges(res.data.user.unlockedBadges);
          setUnlockedBorders(res.data.user.unlockedBorders);
          setUnlockedCelebrations(res.data.user.unlockedCelebrations);
          setAllTimeCompleted(res.data.user.finishedTodos);
          setAllTimeFailed(res.data.user.failedTodos);
        }
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get(`/api/user/${user.id}/weekly`)
      .then((res) => {
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setWeeklyProgress(res.data.todos);
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
    let table = checkAchievements(user.id, enqueueSnackbar, {"todosCompleted": allTimeCompleted + counter})
    let newUnlockedBorders = unlockedBorders;
    for (const i in table[1]) {
      newUnlockedBorders[table[1][i]] = true;
    }
    setUnlockedBorders(newUnlockedBorders);
    let newUnlockedCelebrations = unlockedCelebrations;
    for (const i in table[2]) {
      newUnlockedCelebrations[table[2][i]] = true;
    }
    setUnlockedBadges(newUnlockedCelebrations);
    let newUnlockedBadges = unlockedBadges;
    for (const i in table[0]) {
      newUnlockedBadges[table[0][i]] = true;
    }
    setUnlockedBadges(newUnlockedBadges);
  }

  return (
    <Layout user={user}>
      <Container>
        <Grid container justify="center" spacing={3} className="mb-2">
          <Grid item xs={10} md={7}>
            <h5 className="mt-2 text-secondary">{greeting}</h5>
            <Card
              className="p-2 mt-2"
              variant="outlined"
              style={{minHeight: "620px"}}
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
                                  className="bg-light p-2"
                                  variant="outlined"
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
                <Grid item xs={12} md={9} className="mb-2">
                  <h3 className="text-center">Weekly Progress</h3>
                  <div style={{height: "200px"}}>
                    <WeeklyChart 
                      weeklyProgress={weeklyProgress}
                      counter={counter}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={3} className="mb-2">
                <h3 className="text-center">All Time Progress</h3>
                  <div style={{height: "150px"}}>
                    {
                      (allTimeCompleted + counter === 0 && allTimeFailed === 0) ? <NoTimeChart /> : 
                      <AllTimeChart allTimeCompleted={allTimeCompleted + counter} allTimeFailed={allTimeFailed} />
                    }
                  </div>
                </Grid>
                <Grid container item xs={12} justify="center" className="mb-2">
                  <Grid item xs={10}>
                    <br/>
                    <h3>Additional Stats</h3>
                    <div>{Object.keys(unlockedBadges).length + "/" + (Object.keys(badges).length - 1) + " Badges Unlocked!"}</div>
                    <ProgressBar animated now={Object.keys(unlockedBadges).length / (Object.keys(badges).length - 1) * 100}/>
                    <br/>
                    <div>{Object.keys(unlockedBorders).length + "/" + (Object.keys(borders).length - 1) + " Borders Unlocked!"}</div>
                    <ProgressBar animated variant="success" now={Object.keys(unlockedBorders).length /(Object.keys(borders).length - 1) * 100}/>
                    <br/>
                    <div>{Object.keys(unlockedCelebrations).length + "/" + Object.keys(celebrations).length + " Celebrations Unlocked!"}</div>
                    <ProgressBar animated variant="danger" now={Object.keys(unlockedCelebrations).length / Object.keys(celebrations).length * 100}/>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid container item xs={10} md={5} direction="column" justify="flex-start">
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