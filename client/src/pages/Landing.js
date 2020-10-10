import React, { useEffect } from 'react';
import AmongUs from '../images/splash.mp4'; 
import AppFooter from '../components/AppFooter';

export default function Landing() {
  useEffect(() => {
    window.gapi.load('signin2', () => {
        window.gapi.signin2.render(
          'login-button', 
          {
            'theme': 'dark',
            'width': 160,
            'height': 40,
          }
        )
    })
  })
  
  return (
    <div>
      <div className="section">
        <h1 className="landing-brand text-center">
          {/* <div>Tasks</div>
          <div>Among</div>
          <div>Us</div> */}
          TasksAmongUs
        </h1>
        <div id="login-button">sign in</div>
        
        <div class="video-container">
            <div class="color-overlay"></div>
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