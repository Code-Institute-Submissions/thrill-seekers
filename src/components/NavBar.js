import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";


const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addRatingIcon = (
    <NavLink 
      className={styles.NavLinkCustom} 
      activeClassName={styles.Active} 
      to="/parks/ratings"
    > 
        <i className="far fa-regular fa-star-half-stroke"></i>Ratings
    </NavLink>
  );

  const addParkCreateIcon = (
    <NavLink 
      className={styles.NavLinkCustom} 
      activeClassName={styles.Active} 
      to="/parks/add">
        <i className="far fa-regular fa-square-plus"></i>Add Park
    </NavLink>
  );

  const loggedInIcons = (
    <>
      
      <NavLink 
        className={styles.NavLinkCustom} 
        activeClassName={styles.Active} 
        to="/parks/bucketlist">
          <i className="far fa-regular fa-bucket"></i>Bucketlist
      </NavLink>

      <NavLink 
        className={styles.NavLinkCustom} 
        activeClassName={styles.Active} 
        to="/parks/ratings/liked">
          <i className="far fa-regular fa-thumbs-up"></i>Liked
      </NavLink>

      <NavLink 
        className={styles.NavLinkCustom} 
        to="/" onClick={handleSignOut}>
          <i className="far fa-regular fa-arrow-right-from-bracket"></i>Sign out
      </NavLink>

      <NavLink 
        className={styles.NavLinkCustom} 
        to={'/profiles/${CurrentUser?.profile_id}'}
      >      
        <Avatar src={currentUser?.profile_picture} text="Profile" height={40}/>
      </NavLink>
    
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
    <Navbar className={styles.NavBar} expand="md" fixed="top" variant="dark">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && currentUser.isSuperuser && addParkCreateIcon}

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
            

            

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;