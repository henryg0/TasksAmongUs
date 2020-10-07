import React, { useEffect } from 'react';

import Layout from '../components/Layout';

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
    <Layout>
      <div id="landing-page" className="text-center">
        <h1 className="landing-brand">MakeTodo</h1>
        <div id="login-button">sign in</div>
      </div>
    </Layout>
  )
}