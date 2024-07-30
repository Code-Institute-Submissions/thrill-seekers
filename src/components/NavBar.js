import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo2.webp";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push("/"); 
    } catch (err) {
      // console.log(err);
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
          to={`/profiles/${currentUser?.profile_id}`}
        >
          <i className="fas fa-id-card"></i> Profile
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
      <Nav className="d-md-none">
        <div className={`${styles.MobileUserInfo}`}>
          <Avatar src={currentUser?.profile_picture} height={30} />
          <span>{currentUser?.username} is logged in</span>
        </div>
        {loggedInLinks}
      </Nav>

      <div 
        className={`d-none d-md-block ${styles.AvatarDropdown}`}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className={`${styles.NavLinkCustom} ${styles.CustomDropdownToggle}`}>
          <Avatar src={currentUser?.profile_picture} height={40} text={currentUser?.username} />
          <i className={`fas fa-chevron-down ${styles.DropdownArrow}`}></i>
        </div>

        {showDropdown && (
          <div className={styles.NavLinkDropdown}>
            {loggedInLinks}
          </div>
        )}
      </div>
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
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top" variant="dark">
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