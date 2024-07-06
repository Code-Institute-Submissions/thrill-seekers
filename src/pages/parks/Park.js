import React from 'react';
import styles from '../../styles/Park.module.css';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";


/* Parks */
const Park = (props) => {
  const {
    id,
    user,
    name,
    profile_id,
    profile_picture,
    description,
    bucketlist_count,
    bucketlist_id,
    rating_count,
    rating_id,
    image,
    street,
    city,
    postal_code,
    country,
    opening_hours,
    entrance_fees,
    total_number_of_rides,
    total_number_of_roller_coasters,
    total_number_of_shows,
    total_number_of_children_rides,
    park_size,
    average_rating,
    updated_at,
    parkPage,
    
  } = props;
  
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === user

  return (
    <Card className={styles.Park}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`} className="d-flex align-items-center">
            <Avatar src={profile_picture} height={55} />
            
            {user}
          </Link>
          <div className="d-flex align-items-center">
              <span>{updated_at}</span>
              {is_owner && parkPage && "..."}
          </div>

        </Media>
      </Card.Body>
      <Link to={`/parks/${id}`}>
        <Card.Img src={image} alt={name} />
      </Link>
      <Card.Body>
        {name && <Card.Title className="text-center">{name}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
      </Card.Body>      

    </Card>
  );
};







export default Park;