import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top" variant="dark">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left" id={styles.NavLinkText}>
            <NavLink exact className={styles.NavLinkCustom} activeClassName={styles.Active} to="/">
              <i className="fas fa-regular fa-house-user"></i>Home
            </NavLink>
            <NavLink className={styles.NavLinkCustom} activeClassName={styles.Active} to="/about">
              <i className="fas fa-regular fa-circle-info"></i>About
            </NavLink>
            <NavLink className={styles.NavLinkCustom} activeClassName={styles.Active} to="/contact">
              <i className="fas fa-regular fa-address-book"></i>Contact
            </NavLink>
            <NavLink className={styles.NavLinkCustom} activeClassName={styles.Active} to="/signin"> 
              <i className="fas fa-regular fa-arrow-right-to-bracket"></i>Sign in
            </NavLink>
            <NavLink className={styles.NavLinkCustom} activeClassName={styles.Active} to="/signup">
              <i className="fas fa-regular fa-user-plus"></i>Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;