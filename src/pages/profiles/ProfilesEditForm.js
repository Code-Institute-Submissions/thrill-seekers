import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Container, Alert, Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/ProfilesEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function ProfilesEditForm() {
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    favorite_park: "",
    favorite_ride: "",
    userbio: "",
    profile_picture: "",
  });
  const { favorite_park, favorite_ride, userbio, profile_picture } = profileData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        const { favorite_park, favorite_ride, userbio, profile_picture, is_owner } = data;

        is_owner ? setProfileData({ favorite_park, favorite_ride, userbio, profile_picture }) : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(profile_picture);
      setProfileData({
        ...profileData,
        profile_picture: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("favorite_park", favorite_park);
    formData.append("favorite_ride", favorite_ride);
    formData.append("userbio", userbio);

    if (imageInput?.current?.files[0]) {
      formData.append("profile_picture", imageInput.current.files[0]);
    }
    
    try {
      await axiosReq.put(`/profiles/${id}/`, formData);
      history.push(`/profiles/${id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={`${appStyles.Content} ${styles.Container}`}>
        <Form.Group className="text-center">
          <div className={`${styles.ImageContainer} ${styles.ImageUpload}`}>
            <figure>
              <Image className={appStyles.Image} src={profile_picture} rounded />
            </figure>
            <div>
              <Button
                className={`${btnStyles.Button} ${styles.ChangeImageButton}`}
                onClick={() => imageInput.current.click()}
              >
                Change the image
              </Button>
            </div>
            <Form.File
              id="image-upload"
              accept="image/*"
              onChange={handleChangeImage}
              ref={imageInput}
              style={{ display: "none" }}
            />
          </div>
        </Form.Group>
        {errors?.profile_picture?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Favorite Park</Form.Label>
          <Form.Control
            type="text"
            name="favorite_park"
            value={favorite_park}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.favorite_park?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Favorite Ride</Form.Label>
          <Form.Control
            type="text"
            name="favorite_ride"
            value={favorite_ride}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.favorite_ride?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="userbio"
            value={userbio}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.userbio?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <div className="text-center">
          <Button 
            className={`${btnStyles.Button} mr-3`} 
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
          <Button className={`${btnStyles.Button}`} type="submit">
            Update
          </Button>
        </div>
      </Container>
    </Form>
  );
}

export default ProfilesEditForm;