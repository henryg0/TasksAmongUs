import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

export default function AppNavbar(props) {
  const user = props.user;
  return (
    <Navbar expand="lg">
      <Container className="pt-0 pb-0">
        <Navbar.Brand href="/">
          MakeTodo
        </Navbar.Brand>
        { user &&
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        }
        <Navbar.Collapse id="basic-navbar-nav">
          { user &&
            <Nav className="mr-auto">
              <Nav.Link href="/" className="nav-item"><div className="nav-item">ACTIVITY</div></Nav.Link>
              <Nav.Link href="/todos" className="nav-item"><div className="nav-item">TODOS</div></Nav.Link>
              <Nav.Link href="/social" className="nav-item"><div className="nav-item">SOCIAL</div></Nav.Link>
              {/* <NavDropdown title="DROPDOWN" id="nav-groups">
                <NavDropdown.Item href="#action/3.1">Filler1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Filler2</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Filler3</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          }
          { user &&
            <Nav>
              <NavDropdown title={
                <>
                  <Image
                    className="mr-1"
                    roundedCircle
                    src={user.imageUrl}
                    width={24}
                    height={24}
                  />
                  {user.name.toUpperCase()}
                </>
              } id="nav-profile">
                <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={user.signOut}>Sign out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}