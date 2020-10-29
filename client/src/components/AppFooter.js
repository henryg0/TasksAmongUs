import React from 'react';
import Container from 'react-bootstrap/Container';

export default function AppFooter() {
  return (
    <Container className="text-center pt-0 pb-0 pt-3">
      <p>
        <a href="/about" className="nav-item">ABOUT</a>
        {" "}•{" "}
        {/* <a href="/#contact" className="nav-item">CONTACT</a> */}
        {/* {" "}•{" "} */}
        <a href="https://github.com/vincentktieu-ucsb/MakeTodo" className="nav-item">GITHUB</a>
      </p>
      @TasksAmongUs 2020
    </Container>
  )
}