import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from '../../styles/NotFound.module.css';

const NotFound = () => {
  const history = useHistory();

  const handleGoToParks = () => {
    history.push('/');
  };

  return (
    <div className={styles.NotFoundContainer}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button onClick={handleGoToParks} className={styles.Button}>
        Back to Parks
      </Button>
    </div>
  );
};

export default NotFound;
