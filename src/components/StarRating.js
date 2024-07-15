import React from "react";
import StarRatings from 'react-star-ratings';
import styles from "../styles/RatingCreateEditForm.module.css";

const StarRating = ({ rating = 1, onSetRating, totalStars = 5, editable = true }) => {
  const handleRatingChange = (newRating) => {
    if (editable && onSetRating) {
      onSetRating(newRating);
    }
  };

  return (
    <div className={styles.starRating}>
      <StarRatings
        rating={rating}
        starRatedColor="#ffc107"
        changeRating={editable ? handleRatingChange : undefined}
        numberOfStars={totalStars}
        name='rating'
        starDimension="35px"
        starSpacing="8px"
        starHoverColor={editable ? "#ffc107" : undefined}
      />
    </div>
  );
};

export default StarRating;