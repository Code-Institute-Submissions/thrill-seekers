import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/RatingCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import StarRating from "../../components/StarRating";
import { axiosRes } from "../../api/axiosDefaults";

function RatingCreateForm(props) {
  const { park, profile_picture, profile_id, username, onRatingCreate } = props;
  const [explanation, setExplanation] = useState("");
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState({});
  const [customError, setCustomError] = useState("");

  const handleExplanationChange = (event) => {
    setExplanation(event.target.value);
    setCustomError(""); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setCustomError("");

    if (!explanation.trim()) {
      setCustomError("Explanation is required. Please provide a reason for your rating.");
      return;
    }

    try {
      const { data } = await axiosRes.post("/ratings/", {
        explanation,
        park,
        rating,
      });
      onRatingCreate(data);
      setExplanation("");
      setRating(1);
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
        if (err.response.data.detail) {
          setErrors(prevErrors => ({...prevErrors, general: err.response.data.detail}));
        }
        if (err.response.data.explanation) {
          setErrors(prevErrors => ({...prevErrors, explanation: err.response.data.explanation}));
        }
      } else {
        console.log(err);
        setErrors({general: "An unexpected error occurred. Please try again."});
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Rate the park and write a statement</h3>
        <div className="d-flex align-items-center">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_picture} />
            <span className={styles.Username}>{username}</span>
          </Link>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        {errors.general && <Alert variant="danger">{errors.general}</Alert>}
        {customError && <Alert variant="warning">{customError}</Alert>}
        
        <Form.Group>
          <Form.Label htmlFor="star-rating" className={styles.formLabel}>Rate the park:</Form.Label>
          <StarRating 
            id="star-rating"
            rating={rating} 
            onSetRating={setRating} 
            totalStars={5} 
            editable={true} 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="explanation" className={styles.formLabel}>Explanation:</Form.Label>
          <InputGroup>
            <Form.Control
              id="explanation"
              className={`${styles.Form} form-control`}
              placeholder="I rated this because... (required)"
              as="textarea"
              value={explanation}
              onChange={handleExplanationChange}
              rows={2}
              isInvalid={!!errors.explanation || !!customError}
            />
            <Form.Control.Feedback type="invalid">
              {errors.explanation || customError}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <button
            className={`${styles.Button}`}
            disabled={rating === 0}
            type="submit"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export default RatingCreateForm;
