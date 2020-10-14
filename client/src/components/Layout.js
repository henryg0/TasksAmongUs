import React from 'react';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import { SnackbarProvider } from 'notistack';

export default function Layout(props) {
  const user = props.user;

  return (
    <div>
      <div id="page-container">
        <AppNavbar user={user} />
        <div id="content-wrap">
          {props.children}
        </div>
        <div id="footer">
          <AppFooter />
        </div>
      </div>
    </div>
  );
}
