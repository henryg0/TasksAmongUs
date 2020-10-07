import React from "react";
import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";

export default function Layout(props) {
  const user = props.user;

  return (
      <div id="page-container">
        <AppNavbar user={user} />
        <div id="content-wrap">
          {props.children}
        </div>
        <div id="footer">
          <AppFooter />
        </div>
      </div>
  );
}
