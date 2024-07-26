import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo2.webp";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faIdCard, faArrowRightFromBracket, faHouseUser, 
  faCircleInfo, faAddressBook, faChevronDown, faArrowRightToBracket, 
  faUserPlus } from '@fortawesome/free-solid-svg-icons';

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
      history.push("/"); 
    } catch (err) {
      console.log(err);
    }
  };

  const addParkCreateIcon = (
    <NavLink 
      id={styles.NavLinkParkCreate} 
      activeClassName={styles.Active} 
      to="/parks/add">
        <FontAwesomeIcon icon={faSquarePlus} /> Add Park
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
          <FontAwesomeIcon icon={faIdCard} /> Profile
        </Nav.Link>
        <Nav.Link
          className={styles.NavLinkCustom}
          onClick={handleSignOut}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign out
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
          <FontAwesomeIcon icon={faChevronDown} className={styles.DropdownArrow} />
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
          <FontAwesomeIcon icon={faArrowRightToBracket} /> Sign in
      </NavLink>

      <NavLink className={styles.NavLinkCustom} 
        activeClassName={styles.Active} to="/signup">
          <FontAwesomeIcon icon={faUserPlus} /> Sign up
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
              <FontAwesomeIcon icon={faHouseUser} /> Home
            </NavLink>
            <NavLink className={styles.NavLinkCustom} activeClassName={styles.Active} to="/about">
              <FontAwesomeIcon icon={faCircleInfo} /> About
            </NavLink>
            <NavLink className={styles.NavLinkCustom} activeClassName={styles.Active} to="/contact">
              <FontAwesomeIcon icon={faAddressBook} /> Contact
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
