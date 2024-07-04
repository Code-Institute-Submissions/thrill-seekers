import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image  from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload-icon.webp";

import styles from "../../styles/ParkAddEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";


function ParkCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    name: "",
    description: "",
    image: "",
    street: "",
    city: "",
    postal_code: "",
    country: "",
    opening_hours: "",
    entrance_fees: "",
    total_number_of_rides: "",
    total_number_of_roller_coasters: "",
    total_number_of_shows: "",
    total_number_of_children_rides: "",
    park_size: "",
    family_friendliness: "",
    thrill_factor: "",
    overall_rating: "",
  });
  const { 
    name, description, image, street, city, postal_code, country, 
    opening_hours, entrance_fees, total_number_of_rides, 
    total_number_of_roller_coasters, total_number_of_shows, 
    total_number_of_children_rides, park_size, family_friendliness,
    thrill_factor, overall_rating
  } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("postal_code", postal_code);
    formData.append("country", country);
    formData.append("opening_hours", opening_hours);
    formData.append("entrance_fees", entrance_fees);
    formData.append("total_number_of_rides", total_number_of_rides);
    formData.append("total_number_of_roller_coasters", total_number_of_roller_coasters);
    formData.append("total_number_of_shows", total_number_of_shows);
    formData.append("total_number_of_children_rides", total_number_of_children_rides);
    formData.append("park_size", park_size);
    formData.append("family_friendliness", family_friendliness);
    formData.append("thrill_factor", thrill_factor);
    formData.append("overall_rating", overall_rating);

    try {
      const { data } = await axiosReq.post("/parks/", formData);
      history.push(`/parks/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };


  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          name="street"
          value={street}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.street?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={city}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.city?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          name="postal_code"
          value={postal_code}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.postal_code?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="country"
          value={country}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.country?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Opening Hours</Form.Label>
        <Form.Control
          type="text"
          name="opening_hours"
          value={opening_hours}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.opening_hours?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Entrance Fees</Form.Label>
        <Form.Control
          type="text"
          name="entrance_fees"
          value={entrance_fees}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.entrance_fees?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Total Number of Rides</Form.Label>
        <Form.Control
          type="number"
          name="total_number_of_rides"
          value={total_number_of_rides}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.total_number_of_rides?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Total Number of Roller Coasters</Form.Label>
        <Form.Control
          type="number"
          name="total_number_of_roller_coasters"
          value={total_number_of_roller_coasters}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.total_number_of_roller_coasters?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Total Number of Shows</Form.Label>
        <Form.Control
          type="number"
          name="total_number_of_shows"
          value={total_number_of_shows}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.total_number_of_shows?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Total Number of Children Rides</Form.Label>
        <Form.Control
          type="number"
          name="total_number_of_children_rides"
          value={total_number_of_children_rides}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.total_number_of_children_rides?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Park Size</Form.Label>
        <Form.Control
          type="number"
          name="park_size"
          value={park_size}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.park_size?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Family Friendliness (0.00 - 5.00)</Form.Label>
        <Form.Control 
          type="number" 
          step="0.01" 
          min="0" 
          max="5" 
          name="family_friendliness" 
          value={family_friendliness} 
          onChange={handleChange} 
        />
      </Form.Group>
      {errors?.family_friendliness?.map((message, idx) => (
        <Alert variant="warning" key={idx}>{message}</Alert>
      ))}

      <Form.Group>
        <Form.Label>Thrill Factor (0.00 - 5.00)</Form.Label>
        <Form.Control 
          type="number" 
          step="0.01" 
          min="0" 
          max="5" 
          name="thrill_factor" 
          value={thrill_factor} 
          onChange={handleChange} 
        />
      </Form.Group>
      {errors?.thrill_factor?.map((message, idx) => (
        <Alert variant="warning" key={idx}>{message}</Alert>
      ))}

      <Form.Group>
        <Form.Label>Overall Rating (0.00 - 5.00)</Form.Label>
        <Form.Control 
          type="number" 
          step="0.01" 
          min="0" 
          max="5" 
          name="overall_rating" 
          value={overall_rating} 
          onChange={handleChange} 
        />
      </Form.Group>
      {errors?.overall_rating?.map((message, idx) => (
        <Alert variant="warning" key={idx}>{message}</Alert>
      ))}

      <Button
        className={`${btnStyles.Button}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ParkCreateForm;
