import React from "react";
import { Navbar, Container, Nav, Dropdown} from "react-bootstrap";
import logo from "../assets/logo2.webp";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addParkCreateIcon = (
    <NavLink 
      id={styles.NavLinkParkCreate} 
      activeClassName={styles.Active} 
      to="/parks/add">
        <i className="far fa-regular fa-square-plus"></i>Add Park
    </NavLink>
    );

const loggedInLinks = (
  <>
    <div id={styles.NavLinkTextMobil}>
      {currentUser?.is_staff && (
        <Nav.Link className={styles.NavLinkCustom} as="div">
          {addParkCreateIcon}
        </Nav.Link>
      )}

        <Nav.Link
          exact
          as={NavLink}
          className={styles.NavLinkCustom}
          activeClassName={styles.Active}
          to="/parks/ratings"
        >
          <i className="far fa-regular fa-star-half-stroke"></i> Ratings
        </Nav.Link>
        <Nav.Link
          exact
          as={NavLink}
          className={styles.NavLinkCustom}
          activeClassName={styles.Active}
          to="/parks/bucketlist"
        >
          <i className="far fa-regular fa-bucket"></i> Bucketlist
        </Nav.Link>
        <Nav.Link
          exact
          as={NavLink}
          className={styles.NavLinkCustom}
          activeClassName={styles.Active}
          to="/parks/ratings/liked"
        >
          <i className="far fa-regular fa-thumbs-up"></i> Liked
        </Nav.Link>
        <Nav.Link
          className={styles.NavLinkCustom}
          onClick={handleSignOut}
        >
          <i className="fas fa-solid fa-arrow-right-from-bracket"></i> Sign out
        </Nav.Link>
      </div>
  </>
);

  const loggedInIcons = (
    <>
      <Dropdown className="d-none d-md-block">
        <Dropdown.Toggle variant="success" id="dropdown-basic" className={`${styles.NavLinkCustom} ${styles.CustomDropdownToggle}`}>
          <Avatar src={currentUser?.profile_picture} height={40} text={currentUser?.username} />
        </Dropdown.Toggle>

        <Dropdown.Menu id={styles.NavLinkDropdown}>
          {loggedInLinks}
        </Dropdown.Menu>  
      </Dropdown>

      <Nav className="d-md-none">
        {loggedInLinks}
      </Nav>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink 
        className={styles.NavLinkCustom} 
        activeClassName={styles.Active} 
        to="/signin"> 
          <i className="fas fa-regular fa-arrow-right-to-bracket"></i>Sign in
      </NavLink>

      <NavLink className={styles.NavLinkCustom} 
        activeClassName={styles.Active} to="/signup">
          <i className="fas fa-regular fa-user-plus"></i>Sign up
      </NavLink>

    </>
  );

  return (
    <Navbar  expanded={expanded} className={styles.NavBar} expand="md" fixed="top" variant="dark">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
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
            

            

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;