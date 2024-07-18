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
  const { park, setPark, setRatings, profile_picture, profile_id, username } = props;
  const [explanation, setExplanation] = useState("");
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState({});

  const handleExplanationChange = (event) => {
    setExplanation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    try {
      const { data } = await axiosRes.post("/ratings/", {
        explanation,
        park,
        rating,
      });
      setRatings((prevRatings) => ({
        ...prevRatings,
        results: [data, ...prevRatings.results],
      }));
      setPark((prevPark) => ({
        results: [
          {
            ...prevPark.results[0],
            ratings_count: prevPark.results[0].ratings_count + 1,
          },
        ],
      }));
      setExplanation("");
      setRating(1);
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
        if (err.response.data.detail) {
          // This is for the "You have already rated this park" error
          setErrors(prevErrors => ({...prevErrors, general: err.response.data.detail}));
        }
        if (err.response.data.explanation) {
          // This is for the "Explanation is required" error
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
        
        <Form.Group>
          <Form.Label className={styles.formLabel}></Form.Label>
          <StarRating rating={rating} onSetRating={setRating} totalStars={5} editable={true} />
        </Form.Group>

        <Form.Group>
          <InputGroup>
            <Form.Control
              className={`${styles.Form} form-control`}
              placeholder="I rated this because..."
              as="textarea"
              value={explanation}
              onChange={handleExplanationChange}
              rows={2}
              isInvalid={!!errors.explanation}
            />
            <Form.Control.Feedback type="invalid">
              {errors.explanation}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <button
            className={`${styles.Button}`}
            disabled={!explanation.trim() || rating === 0}
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