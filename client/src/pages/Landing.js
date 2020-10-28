import React, { useEffect } from 'react';
import AppFooter from '../components/AppFooter';
import axios from 'axios';
import authenticate from '../utils/authenticate';

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
      <div style={{backgroundColor:"black", height:"300px", width:"100%"}}>
      </div>
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