import React from 'react'
import { Nav, Navbar, Container, Button, NavDropdown } from 'react-bootstrap';
import { useLogoutUserMutation } from '../services/appApi';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/chat.png'

function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    //REDIRECT TO HOMEPAGE
    window.location.replace('/');
  }

  return (
    <Navbar bg='dark' expand="lg" data-bs-theme='dark'>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
              <img src={logo} alt="logo" style={{width: 50, height: 50}} />
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user &&(
              <NavDropdown title="Login/Signup" id="nav-dropdown">
                <LinkContainer to="/login">
                  <NavDropdown.Item eventKey="4.1">
                    Login
                  </NavDropdown.Item>
                </LinkContainer>
              <NavDropdown.Divider />
                <LinkContainer to="/signup">
                  <NavDropdown.Item eventKey="4.4">
                    Signup
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            {user && (
              <NavDropdown 
                title={
                  <>
                    <img src={user.picture} alt='User Profile' style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                  </>
                } 
                id="basic-nav-dropdown">
                
                <NavDropdown.Item>
                  <Button variant='danger' onClick={handleLogout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation;