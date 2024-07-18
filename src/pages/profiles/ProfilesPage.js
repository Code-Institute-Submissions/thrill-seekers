import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/ProfilesPage.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ProfilesPage() {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const [profileData, setProfileData] = useState({ pageProfile: { results: [] } });
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [id, history]);

  const profile = profileData.pageProfile.results[0];

  if (!profile) return <Container>Loading...</Container>;

  return (
    <Container className={styles.ProfileContainer}>
      <Card className={`${appStyles.Container} ${styles.ProfileCard}`}>
        <Card.Body>
          <Row className="justify-content-center">
            <Col md={4} className="text-center">
              <Image 
                className={styles.ProfileImage}
                roundedCircle 
                src={profile.profile_picture} 
                alt={`${profile.user}'s profile`}
              />
              <h3 className={styles.Username}>{profile.user}</h3>
            </Col>
            <Col md={8}>
              <div className={styles.ProfileInfo}>
                <p><strong>Favorite Park:</strong> {profile.favorite_park}</p>
                <p><strong>Favorite Ride:</strong> {profile.favorite_ride}</p>
                <p><strong>Bio:</strong> {profile.userbio}</p>
                <p><strong>Member since:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
              <div className={styles.ProfileStats}>
                <Row className="text-center">
                  <Col xs={4}>
                    <i className={`fas fa-star ${styles.RatingIcon}`}></i>
                    <span>{profile.ratings_count}</span>
                    <p>ratings</p>
                  </Col>
                  <Col xs={4}>
                    <i className={`fas fa-bucket ${styles.BucketIcon}`}></i>
                    <span>{profile.bucketlist_count}</span>
                    <p>bucketlist</p>
                  </Col>
                </Row>
              </div>
              {profile.is_owner && currentUser && (
                <Button 
                  className={styles.EditButton}
                  onClick={() => history.push(`/profiles/${id}/edit`)}
                >
                  Edit Profile
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfilesPage;