import React from 'react';
import { Route } from "react-router-dom";
import Landing from '../pages/Landing';

export default function authenticateComponent({component: Component, ...rest}) {
  if (!window.gapi) {
    return <div></div>;
  }

  const authInstance =  window.gapi.auth2.getAuthInstance();
  const isSignedIn = authInstance.isSignedIn.get();

  return (
    <Route
      {...rest}
      component = {() => isSignedIn ? <Component /> : <Landing />}
    />
  )
}