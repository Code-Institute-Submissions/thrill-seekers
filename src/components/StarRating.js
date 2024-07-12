import React, { useState } from "react";
import styles from "../styles/RatingCreateEditForm.module.css";

const StarRating = ({ rating =1, onSetRating, totalStars =5 }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarHover = (star) => {
    setHoveredRating(star);
  };

  const handleStarClick = (star) => {
    onSetRating(star);
  };

  return (
    <div className={styles.starRating}>
      {[...Array(totalStars)].map((_, index) => {
        const star = index + 1;
        return (
          <i
            key={star}
            className={`fa fa-star ${styles.star} ${star <= (hoveredRating || rating) ? styles.selected : styles.unselected}`}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={() => handleStarHover(0)}
            onClick={() => handleStarClick(star)}
            
          />
        );
      })}
    </div>
  );
};

export default StarRating;