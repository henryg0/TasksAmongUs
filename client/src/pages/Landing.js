import React, { useEffect } from 'react';
import AmongUs from '../images/splash.mp4'; 
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
          TasksAmongUs
        </h1>
        <div id="login-button"></div>
        
        <div className="video-container">
            <div className="color-overlay"></div>
            <video autoPlay loop muted>
                <source src={AmongUs} type="video/mp4" />
            </video>
        </div>
      </div>
      <div id="footer">
        <AppFooter />
      </div>
    </div>
  )
}