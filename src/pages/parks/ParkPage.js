import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import { useParams, useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Park from "./Park";
import parkStyles from "../../styles/Park.module.css";
import ratingStyles from "../../styles/Rating.module.css";
import ratingCreateStyles from "../../styles/RatingCreateEditForm.module.css";
import Card from "react-bootstrap/Card";

import appStyles from "../../App.module.css";
import StarRating from "../../components/StarRating";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

import Rating from "../ratings/Rating.js";
import RatingCreateForm from "../ratings/RatingCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function ParkPage() {
  const { id } = useParams();
  const [park, setPark] = useState({ results: [] });
  const [ratings, setRatings] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

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
        setRatings({ results: ratingsData.results, next: ratingsData.next });
        setHasLoaded(true);
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
          
              {currentUser && (
                <RatingCreateForm
                  profile_id={currentUser.profile_id}
                  profile_picture={profile_picture}
                  park={id}
                  setPark={setPark}
                  setRatings={setRatings}
                  username={username}
                />
              )} 

        <h3 className="mt-4">Ratings</h3>
        
        {ratings.results.length ? (
            <InfiniteScroll
            dataLength={ratings.results.length}
            next={() => fetchMoreData(ratings, setRatings)}
            hasMore={!!ratings.next}
            loader={<Asset spinner />}
          >
            {ratings.results.map((rating, index) => (
              <div key={rating.id} className="mt-3">
                <Rating {...rating} setRatings={setRatings} />
                {index < ratings.results.length - 1 && <hr />}
              </div>
            ))}
          </InfiniteScroll>

        ) : currentUser ? (
          <span>No ratings yet, make the first one!</span>
        ) : (
          <span>No ratings... yet</span>
        )}     
        </div>
      </div>
    </div>  
  </div>  
  );
}

export default ParkPage;