import React from 'react';
import Container from '@material-ui/core/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import icon from '../images/icon.png';

export default function AppNavbar(props) {
  const user = props.user;
  return (
    <div className="navbar">
      <Container>
        <Navbar expand="md">
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
          <Navbar.Collapse id="basic-navbar-nav" className="ml-2">
            <hr/>
            { user &&
              <Nav className="mr-auto">
                { window.location.href === `${window.location.origin.toString()}/` ?
                  <Nav.Link href="/" className="nav-item"><div className="nav-item"><u>HOME</u></div></Nav.Link> :
                  <Nav.Link href="/" className="nav-item"><div className="nav-item">HOME</div></Nav.Link>
                }
                <hr/>
                { window.location.href === `${window.location.origin.toString()}/profile` ?
                  <Nav.Link href="/profile" className="nav-item"><div className="nav-item"><u>PROFILE</u></div></Nav.Link> :
                  <Nav.Link href="/profile" className="nav-item"><div className="nav-item">PROFILE</div></Nav.Link>
                }
                <hr/>
                { window.location.href === `${window.location.origin.toString()}/social` ?
                  <Nav.Link href="/social" className="nav-item"><div className="nav-item"><u>SOCIAL</u></div></Nav.Link> :
                  <Nav.Link href="/social" className="nav-item"><div className="nav-item">SOCIAL</div></Nav.Link>
                }
              </Nav>
            }
            <hr/>
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
                    {user.fullName.toUpperCase()}
                  </>
                } id="nav-profile">
                  {/* <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item> */}
                  <NavDropdown.Item href="/" onClick={user.signOut}>Sign out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}