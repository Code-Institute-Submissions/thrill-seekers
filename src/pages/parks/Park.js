import React, { useState } from 'react';
import { Container, Card, Col, Row, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Park.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

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
    ratings_count,
    rating_id,
    total_number_of_rides,
    total_number_of_coasters,
    thrill_factor,
    overall_rating,
    updated_at,
    created_at,
    parkPage,
    setParks,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === user;
  const history = useHistory();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    history.push(`/parks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/parks/${id}/`);
      setParks(prevParks => ({
        ...prevParks,
        results: prevParks.results.filter(park => park.id !== id),
      }));
      history.goBack(); 
    } catch (err) {
      console.log(err);
    }
  };

  const handleBucketlist = async () => {
    try {
      const { data } = await axiosRes.post("/bucketlist/", { park: id });
      setParks(prevParks => ({
        ...prevParks,
        results: prevParks.results.map(park => 
          park.id === id ? { ...park, bucketlist_count: park.bucketlist_count + 1, bucketlist_id: data.id } : park
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUndoBucketlist = async () => {
    try {
      await axiosRes.delete(`/bucketlist/${bucketlist_id}/`);
      setParks(prevParks => ({
        ...prevParks,
        results: prevParks.results.map(park => 
          park.id === id ? { ...park, bucketlist_count: park.bucketlist_count - 1, bucketlist_id: null } : park
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmDelete = () => {
    handleDelete(); 
    setShowDeleteModal(false);
  };

  return (
    <Card className={`h-100 ${styles.ParkCard} ${appStyles.Container}`}>
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
                        Author: {user} 
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

        <div className={`${styles.ParkIcons} mt-3 d-flex justify-content-center`}>
          <div className={styles.BucketIconCounter}>
            <div className={styles.IconWrapper}>
              {bucketlist_id ? (
                <div className={`text-center ${styles.SelectedBucket}`} onClick={handleUndoBucketlist}>
                  <i className={`fas fa-bucket ${styles.Bucket}`} />
                </div>
              ) : currentUser ? (
                <div className={`text-center ${styles.BucketOutline}`} onClick={handleBucketlist}>
                  <i className={`fas fa-bucket ${styles.BucketOutlineIcon}`} /> 
                </div>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to add parks to your bucketlist!</Tooltip>}
                >
                  <div className="text-center">
                    <i className="fas fa-bucket" />
                  </div>
                </OverlayTrigger>
              )}
              <span>{bucketlist_count}</span>
            </div>
            <p className={styles.IconLabel}>bucketlist</p>
          </div>
          <div className={styles.StarIconCounter}>
            <div className={styles.IconWrapper}>
              <Link to={`/parks/${id}`} className="text-center">
                <i className={`far fa-solid fa-star ${styles.star}`}/>
              </Link>
              <span>{ratings_count}</span>
            </div>
            <p className={styles.IconLabel}>ratings</p>
          </div>
        </div>

        {is_owner && parkPage && (
          <div className="mt-3 d-flex justify-content-center align-items-center" id="ParkButtonContainer">
            <Button
              onClick={handleEdit}
              className={`${styles.ParkButton} mr-4`}
            >
              Edit Park
            </Button>
            <Button
              onClick={() => setShowDeleteModal(true)}
              className={styles.ParkButton}
            >
              Delete Park
            </Button>
          </div>
        )}

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this park?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default Park;