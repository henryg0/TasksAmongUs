import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import icon from "../images/icon.png";

export default function AppNavbar(props) {
  const user = props.user;
  return (
    <Navbar expand="lg">
      <Container className="pt-0 pb-0">
        <Navbar.Brand href="/">
          <Image src={icon}
            height={32}
            width={32}
          />
          TasksAmongUs
        </Navbar.Brand>
        { user &&
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        }
        <Navbar.Collapse id="basic-navbar-nav">
          { user &&
            <Nav className="mr-auto">
              { window.location.href === "http://localhost:3000/" ?
                <Nav.Link href="/" className="nav-item"><div className="nav-item"><u>HOME</u></div></Nav.Link> :
                <Nav.Link href="/" className="nav-item"><div className="nav-item">HOME</div></Nav.Link>
              }
              { window.location.href === "http://localhost:3000/todos" ?
                <Nav.Link href="/todos" className="nav-item"><div className="nav-item"><u>TODOS</u></div></Nav.Link> :
                <Nav.Link href="/todos" className="nav-item"><div className="nav-item">TODOS</div></Nav.Link>
              }
              { window.location.href === "http://localhost:3000/social" ?
                <Nav.Link href="/social" className="nav-item"><div className="nav-item"><u>SOCIAL</u></div></Nav.Link> :
                <Nav.Link href="/social" className="nav-item"><div className="nav-item">SOCIAL</div></Nav.Link>
              }
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