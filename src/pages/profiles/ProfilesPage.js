import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/ProfilesPage.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import RatingProfile from "../ratings/RatingProfile";
import NotFound from "../404/NotFound";

function ProfilesPage() {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const [profileData, setProfileData] = useState({ pageProfile: { results: [] } });
  const [bucketlist, setBucketlist] = useState([]);
  const [ratings, setRatings] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: profileData }, { data: ratingsData }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/ratings/?user__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [profileData] },
        }));
        setBucketlist(profileData.bucketlist);
        setRatings({ results: ratingsData.results, next: ratingsData.next });
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
        if (err.response?.status === 404) {
          setNotFound(true);
        }
      }
    };

    handleMount();
  }, [id]);

  const profile = profileData.pageProfile.results[0];

  if (!hasLoaded) return <Asset spinner />;
  if (notFound) return <NotFound />;
  if (!profile) return null;

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
              <div className={styles.ProfileIcons}>
                <Row className="justify-content-center">
                  <Col xs={6} md={4} className="text-center">
                    <i className={`fas fa-bucket ${styles.BucketIcon}`} aria-hidden="true"></i>
                    <span>{profile.bucketlist_count}</span>
                    <p className={styles.IconLabel}>bucketlist</p>
                  </Col>
                  <Col xs={6} md={4} className="text-center">
                    <i className={`fas fa-star ${styles.RatingIcon}`} aria-hidden="true"></i>
                    <span>{profile.ratings_count}</span>
                    <p className={styles.IconLabel}>ratings</p>
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

      <Card className={`${appStyles.Container} ${styles.BucketlistCard} mt-4`}>
        <Card.Body>
          <h4>Bucketlist</h4>
          {bucketlist && bucketlist.length > 0 ? (
            <ol className={styles.BucketlistList}>
              {bucketlist.map((item) => (
                <li key={item.id}>
                  <Link to={`/parks/${item.park}`} className={styles.BucketlistLink}>
                    {item.park_name}
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p>No parks in the bucketlist yet.</p>
          )}
        </Card.Body>
      </Card>

      <Card className={`${appStyles.Container} ${styles.RatingsCard} mt-4`}>
        <Card.Body>
          <h4>Ratings</h4>
          <div className={styles.RatingsContainer}>
            {ratings.results.length ? (
              <InfiniteScroll
                dataLength={ratings.results.length}
                next={() => fetchMoreData(ratings, setRatings)}
                hasMore={!!ratings.next}
                loader={<Asset spinner />}
              >
                {ratings.results.map((rating) => (
                  <RatingProfile 
                    key={rating.id} 
                    {...rating} 
                    setRatings={setRatings}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <p>No ratings yet.</p>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfilesPage;