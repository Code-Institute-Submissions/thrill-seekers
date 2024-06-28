import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left" id={styles.NavLinkText}>
            <Nav.Link className={styles.NavLinkText}>
              <i className="fas fa-regular fa-house-user"></i>Home
            </Nav.Link>
            <Nav.Link className={styles.NavLinkText}>
              <i className="fas fa-regular fa-circle-info"></i>About
            </Nav.Link>
            <Nav.Link className={styles.NavLinkText}>
              <i className="fas fa-regular fa-address-book"></i>Contact
            </Nav.Link>
            <Nav.Link className={styles.NavLinkText}> 
              <i className="fas fa-regular fa-arrow-right-to-bracket"></i>Sign in
            </Nav.Link>
            <Nav.Link className={styles.NavLinkText}>
              <i className="fas fa-regular fa-user-plus"></i>Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;