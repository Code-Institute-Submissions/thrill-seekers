import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Park from "./Park";
import parkStyles from "../../styles/Park.module.css";
import ratingStyles from "../../styles/Rating.module.css";
import ratingCreateStyles from "../../styles/RatingCreateEditForm.module.css";
import Card from "react-bootstrap/Card";

import appStyles from "../../App.module.css";
import StarRating from "../../components/StarRating";

import Rating from "../ratings/Rating.js";
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
        const [{ data: parkData},  {data: ratingsData}] = await Promise.all([
          axiosReq.get(`/parks/${id}`),
          axiosReq.get(`/ratings/?park=${id}`),
        ]);
        setPark({ results: [parkData] });
        setRatings({ results: ratingsData.results });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <div>
      <div className={`mb-3 ${parkStyles.ParkCardDetail}`}>
      <Park {...park.results[0]} setParks={setPark} parkPage />
      </div>
      
      <div className={ "card" }>
        <div className="card-body mt-4">
          <div className="mb-3"> 
          
              {currentUser ? (
                <RatingCreateForm
                  profile_id={currentUser.profile_id}
                  profile_picture={profile_picture}
                  park={id}
                  setPark={setPark}
                  setRatings={setRatings}
                  username={username}
                />
            ) : null}

          </div> 

        <h3 className="mt-4">Ratings</h3>
        
        {ratings.results.length ? (
          ratings.results.map((rating, index) => (
            <div key={rating.id} className="mt-3"  >
              <Rating {...rating} setRatings={setRatings} />
              {index < ratings.results.length - 1 && <hr />}
            </div>
          ))
        
        ) : currentUser ? (
          <span>No ratings yet, make the first one!</span>
        ) : (
          <span>No ratings... yet</span>
        )}     
    </div>
    </div>
    </div>
    
    
  );
}

export default ParkPage;