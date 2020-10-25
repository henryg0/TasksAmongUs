import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import authenticate from '../../utils/authenticate';
import getGreeting from '../../utils/get.greeting';
import getBadges from '../../utils/get.badges';
import getBorders from '../../utils/get.borders';
import getCelebrations from '../../utils/get.celebrations';
import TodoList from './TodoList';
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
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';

export default function Profile() {
  let user = authenticate();
  let badges = getBadges();
  let borders = getBorders();
  let celebrations = getCelebrations();
  let { enqueueSnackbar } = useSnackbar();
  let [greeting, setGreeting] = useState("");

  let [selectedBadge, setSelectedBadge] = useState("none");
  let [selectedBorder, setSelectedBorder] = useState("none");
  let [selectedCelebration, setSelectedCelebration] = useState("amongUsVictory");
  let [unlockedBadges, setUnlockedBadges] = useState({"normie": true, "halloweenie": true, "007": true})
  let [unlockedBorders, setUnlockedBorders] = useState({"black": true,"lightOrange": true, "rainbowViolet": true})
  let [unlockedCelebrations, setUnlockedCelebrations] = useState({"amongUsVictory": true,"blackPanther": true, "dragonBallZ": true})

  let [allTimeCompleted, setAllTimeCompleted] = useState(0);
  let [allTimeFailed, setAllTimeFailed] = useState(0);

  let [dayOne, setDayOne] = useState({date: "Sun", completed: 0, failed: 0});
  let [dayTwo, setDayTwo] = useState({date: "Sat", completed: 0, failed: 0});
  let [dayThree, setDayThree] = useState({date: "Fri", completed: 0, failed: 0});
  let [dayFour, setDayFour] = useState({date: "Thur", completed: 0, failed: 0});
  let [dayFive, setDayFive] = useState({date: "Wed", completed: 0, failed: 0});
  let [daySix, setDaySix] = useState({date: "Tue", completed: 0, failed: 0});
  let [daySeven, setDaySeven] = useState({date: "Mon", completed: 0, failed: 0});

  function displayBadges() {
    let result = [];
    for (let badge in badges) {
      if (badge in unlockedBadges) {
        result.push(
          <FormControlLabel value={badge} control={<Radio style={{color: "red"}} />} key={badge} label={
            <Tooltip title={badges[badge][1]} placement="bottom-start">
              {badges[badge][0]}
            </Tooltip>
          }/>
        )
      } else {
        result.push(
          <FormControlLabel value={badge} control={<Radio disabled style={{color: "secondary"}} />} key={badge} label={
            <Tooltip title={"LOCKED: " + badges[badge][1]} placement="bottom-start">
              {badges[badge][0]}
            </Tooltip>
          }/>
        )
      }
    }
    result = result.slice(0, -1);
    return result;
  }

  function displayBorders() {
    let result = [];
    for (let border in borders) {
      if (border in unlockedBorders) {
        result.push(
          <FormControlLabel value={border} control={<Radio style={{color: "red"}} />} key={border} label={
            <Tooltip title={borders[border][1]} placement="bottom-start">
              <div className={borders[border][0].root}>
                <Avatar src={user.imageUrl} style={{width: "50px", height: "50px"}} />
              </div>
            </Tooltip>
          }/>
        )
      } else {
        result.push(
          <FormControlLabel value={border} control={<Radio disabled style={{color: "secondary"}} />} key={border} label={
            <Tooltip title={"LOCKED: " + borders[border][1]} placement="bottom-start">
              <div className={borders[border][0].root}>
                <Avatar src={user.imageUrl} style={{width: "50px", height: "50px"}} />
              </div>
            </Tooltip>
          }/>
        )
      }
    }
    result = result.slice(0, -1);
    return result;
  }

  function displayCelebrations() {
    let result = [];
    for (let celebration in celebrations) {
      if (celebration in unlockedCelebrations) {
        result.push(
          <FormControlLabel value={celebration} control={<Radio style={{color: "red"}} />} key={celebration} label={
            <Tooltip title={celebrations[celebration][1]} placement="bottom-start">
              <video autoPlay muted loop width="300px">
                <source src={celebrations[celebration]} type="video/mp4" />
              </video>
            </Tooltip>
          }/>
        )
      } else {
        result.push(
          <FormControlLabel value={celebration} control={<Radio disabled style={{color: "secondary"}} />} key={celebration} label={
            <Tooltip title={"LOCKED: " + celebrations[celebration][1]} placement="bottom-start">
              <video autoPlay muted loop width="300px">
                <source src={celebrations[celebration]} type="video/mp4" />
              </video>
            </Tooltip>
          }/>
        )
      }
    }
    return result;
  }

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
        enqueueSnackbar("Badge Failed To Change", {variant: "danger"})
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
        enqueueSnackbar("Border Failed To Change", {variant: "danger"})
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
        enqueueSnackbar("Celebration Failed To Change", {variant: "danger"})
      })
  }

  function renderInCompletedCount() {
    setAllTimeCompleted(allTimeCompleted + 1);
    setDayOne({date: dayOne.date, completed: dayOne.completed + 1, failed: dayOne.failed});
  }

  useEffect(() => {
    setGreeting(getGreeting(user));
    axios.get(`/api/user/${user.id}`)
      .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            if (res.data.user.selectedBadge) {
              setSelectedBadge(res.data.user.selectedBadge);
            }
            if (res.data.user.selectedBorder) {
              setSelectedBorder(res.data.user.selectedBorder);
            }
          }
      })
      .catch((err) => {
        console.log(err);
      })
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
        <Grid container justify="center" spacing={3}>
          <Grid item xs={10} md={7}>
            <h5 className="mt-2 text-secondary">{greeting}</h5>
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
                <Grid item xs={3} lg={3} className="p-2">
                  <Grid container item direction="row">
                    <div className={borders[selectedBorder][0].root}>
                      <Avatar src={user.imageUrl} style={{width: "100px", height: "100px"}} />
                    </div>
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
                                      height: "70vh",
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
                                        <Grid item>{displayBadges()}</Grid>
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
                                        <Grid item>{displayBorders()}</Grid>
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
                                        <Grid item>{displayCelebrations()}</Grid>
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
                <Grid container item direction="column" xs={12} md={6} lg={7} className="text-center text-lg-left" justify="center">
                  <h4>{user.fullName}</h4>
                  <h4>{badges[selectedBadge][0]}</h4>
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
          <Grid container item xs={10} md={5} direction="column" justify="flex-start">
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
              <TodoList user={user} 
                renderInCompletedCount={renderInCompletedCount} 
                selectedBadge={selectedBadge}
                selectedBorder={selectedBorder}
                selectedCelebration={selectedCelebration} 
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}