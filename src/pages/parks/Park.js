import React from 'react';
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import appStyles from "../../App.module.css";
import styles from "../../styles/Park.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


/* Parks */
const Park = (props) => {
  const {
    id,
    user,
    name,
    description,
    image,
    website,
    profile_id,
    profile_picture,
    bucketlist_count,
    bucketlist_id,
    rating_count,
    rating_id,
    total_number_of_rides,
    total_number_of_coasters,
    thrill_factor,
    overall_rating,
    updated_at,
    created_at,
    parkPage, 
  } = props;
  
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === user;

  return (
    <Card className={`${appStyles.Container} h-100 ${styles.ParkCard}`}>
      <Card.Body>
        <Row className="h-100">
          <Col className="py-2 p-0 p-lg-2 order-lg-2" lg={5}>
            <Link to={`/parks/${id}`}>
              {image && (
                <Card.Img
                  src={image}
                  alt={name}
                  className={styles.ParkImage}
                />
              )}
            </Link>
           
          </Col>

          <Col className="py-2 p-0 p-lg-2 order-lg-1" lg={7}>
            <div className={styles.DataCard}>
              <div className={styles.Header}>
                {name && <h2>{name}</h2>}
                {user && profile_picture && (
                  <div className={styles.UserInfo}>
                    <Link
                      to={`/profiles/${profile_id}`}
                      className="d-flex align-items-center"
                    >
                      <Avatar src={profile_picture} height={55} />
                      <span className={styles.UserName}>
                        Author: {user.name} {is_owner && parkPage && "..."}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
              {description && <p>{description}</p>}
              {total_number_of_rides && (
                <p>Total Number of Rides: {total_number_of_rides}</p>
              )}
              {total_number_of_coasters && (
                <p>Total Number of Coasters: {total_number_of_coasters}</p>
              )}
              {thrill_factor && <p>Thrill Factor: {thrill_factor}</p>}
              {overall_rating && <p>Overall Rating: {overall_rating}</p>}
              {website && (
                <p>
                  Website:{" "}
                  <a href={website} className={styles.Link}>
                    {website}
                  </a>
                </p>
              )}
              {created_at && <p>Created At: {created_at}</p>}
              {updated_at && <p>Updated At: {updated_at}</p>}
            </div>
          </Col>
        </Row>
          


      </Card.Body>
    </Card>
  );
};

export default Park;