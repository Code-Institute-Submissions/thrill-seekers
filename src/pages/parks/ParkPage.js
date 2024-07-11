import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Park from "./Park";
import styles from "../../styles/Park.module.css";
import appStyles from "../../App.module.css";
import StarRating from "../../components/StarRating";


import RatingCreateForm from "../ratings/RatingCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function ParkPage() {
  const { id } = useParams();
  const [park, setPark] = useState({ results: [] });
  const [ratings, setRatings] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_picture = currentUser?.profile_picture;
  const username = currentUser?.username;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: parkData }] = await Promise.all([
          axiosReq.get(`/parks/${id}`),
        ]);
        setPark({ results: [parkData] });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <div className={`"mb-3" ${styles.ParkCardDetail}`}>
      <Park {...park.results[0]} setParks={setPark} parkPage />
      
          {currentUser ? (
            <RatingCreateForm
              profile_id={currentUser.profile_id}
              profile_picture={profile_picture}
              park={id}
              setPark={setPark}
              setRatings={setRatings}
              username={username}
            />
          ) : (
            ratings.results.map((rating) => (
              <div key={rating.id}>
                <p>{rating.explanation}</p>
                <p>{rating.rating} star{rating.rating > 1 ? 's' : ''}</p>
              </div>
            ))
          )}
        
  </div>
  );
}

export default ParkPage;