import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import styles from "../../styles/Rating.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import StarRating from "../../components/StarRating";
import RatingEditForm from "./RatingEditForm";

const RatingProfile = (props) => {
  const { 
    id,
    updated_at, 
    user, 
    explanation, 
    rating,
    park,
    park_name,
    setRatings, 
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === user;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/ratings/${id}/`);
      setRatings((prevRatings) => ({
        ...prevRatings,
        results: prevRatings.results.filter((rating) => rating.id !== id),
      }));
      setShowDeleteModal(false); 
    } catch (err) {
      // console.log("Error deleting rating:", err);
    }
  };

  return (
    <div>
      <hr />
      <div>
        <div className="d-flex justify-content-between"> 
          <Link to={`/parks/${park}`} className={styles.ParkNameLink}>
            <span className={styles.Owner}>{`Rating for ${park_name || 'Unknown Park'}`}</span>
          </Link>
          <span className={styles.Date}>{updated_at}</span>
        </div>
        {showEditForm ? (
          <RatingEditForm
            id={id}
            rating={rating}
            explanation={explanation}
            setShowEditForm={setShowEditForm}
            setRatings={setRatings}
          />
        ) : (
          <>
            <div className="mt-2">
              <StarRating rating={Number(rating)} totalStars={5} editable={false} />
            </div>
            <p className={styles.explanationContainer}>{explanation}</p>
          </>
        )}
      </div>
      {is_owner && !showEditForm && (
        <div className="mt-3 d-flex justify-content-center align-items-center" id="RatingButtonContainer">
          <Button
            onClick={() => setShowEditForm(true)}
            className={`${styles.Button} mr-4`}
          >
            Edit Rating
          </Button>
          <Button
            onClick={() => setShowDeleteModal(true)}
            className={styles.Button}
          >
            Delete Rating
          </Button>
        </div>
      )}
      
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
  );
};

export default RatingProfile;
