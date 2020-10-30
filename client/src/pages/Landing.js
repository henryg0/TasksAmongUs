import React, { useEffect } from 'react';
import AppFooter from '../components/AppFooter';
import axios from 'axios';
import authenticate from '../utils/authenticate';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';

export default function Landing() {
  useEffect(() => {
    window.gapi.load('signin2', () => {
        window.gapi.signin2.render(
          'login-button', 
          {
            'theme': 'dark',
            'width': 160,
            'height': 40,
            'onsuccess': onSuccess,
          }
        )
    })
  })
  
  function onSuccess() {
    let user = authenticate();
    user.userId = user.id;
    axios.post("/api/user/create", user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <div className="section">
        <h1 className="landing-brand text-center">
          <br/>
          TasksAmongUs
        </h1>
        <div id="login-button"></div>
        <div className="video-container text-center">
          <video autoPlay loop muted playsInline style={{width:"100%", minWidth: "600px"}}>
            <source src={"https://i.imgur.com/FZvvSgG.mp4"} type="video/mp4"/>
          </video>
        </div>
      </div>
      <Card style={{backgroundColor:"black", width:"100%"}}>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Container>
          <Grid container className="white-text p-2 text-center" justify="center">
            <Grid item xs={10} md={4} justify="center">
              <h4>A Productivity App for You and Your Friends</h4>
              <div>Productivity Log! Customizations! Achievements!</div>
              <br/>
              <div id="landing-text">
                TasksAmongUs is a productivity app where you can create and <i>SHARE</i> todos
                with your friends. The home screen features a feed of your progress.
                Depending on if you complete or fail a todo, you'll see a celebratory
                GIF or a dispointing and humilating meme.
                <br/>
                <br/>
                Add friends and see what todos they're up to. Celebrate with them when
                they finish their todos. Tease them them if they don't! But most
                importantly, keep you and your friends accountable over their responsibilities.
                <br/>
                <br/>
                Expansive library of celebrations GIFs and failure memes that we'll be
                updating every few weeks! Give the production team suggestions on what you'd
                like to see.
                <br/>
                <br/>
                Achievements are a huge way to motivate yourself. When you make progress on
                your responsibilities, we celebrate too. You'll earn customizations that 
                you can use to decorate your profile and your todos!
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
            </Grid>
          </Grid>
        </Container>
      </Card>
      <div style={{
        backgroundColor: "#F6C5C5",
        bottom: "0",
        width: "100%",
        height: "110px"
      }}>
        <AppFooter />
      </div>
    </div>
  )
}