import React, { useState } from "react";
import { Media, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

import styles from "../../styles/Rating.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import StarRating from "../../components/StarRating";

const Rating = (props) => {
  const { 
    profile_id, 
    profile_picture, 
    updated_at, 
    user, 
    explanation, 
    rating,
    id,
    setRatings, 
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === user;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/ratings/${id}/`);
      setRatings((prevRatings) => ({
        ...prevRatings,
        results: prevRatings.results.filter((rating) => rating.id !== id),
      }));
      setShowDeleteModal(false); 
    } catch (err) {
      console.error("Error deleting rating:", err);
    }
  };

  const handleEdit = () => {
    console.log("Edit rating clicked");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Media>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_picture} />
            </Link>
            <Media.Body className="align-self-center ml-2">
              <span className={styles.Owner}>{user}</span>
              <span className={styles.Date}>{updated_at}</span>
              
              <div className={`mt-2 ${styles.star}`}>
                <StarRating rating={rating} totalStars={5} />
              </div>
              <p>{explanation}</p>
            </Media.Body>
          </Media>

          {is_owner ? (
            <div className="mt-3 d-flex justify-content-center align-items-center" id="RatingButtonContainer">
              <Button
                onClick={handleEdit}
                className={`${styles.RatingButton} mr-4`}
              >
                Edit Rating
              </Button>
              <Button
                onClick={() => setShowDeleteModal(true)}
                className={styles.RatingButton}
              >
                Delete Rating
              </Button>
            </div>
           ) : null}

          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Rating</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this rating?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Rating;