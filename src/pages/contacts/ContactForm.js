import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: 'feedback',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000); // 5000 ms = 5 seconds

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    try {
      await axios.post('https://thrill-seekers-api-5fd87044d4ac.herokuapp.com/api/contact/', formData);
      setSuccess(true);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        subject: 'feedback',
        message: ''
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <Row className={`justify-content-center ${styles.Row}`}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Contact Form</h1>
          {success && <Alert variant="success">Message sent successfully!</Alert>}
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="first_name">
              <Form.Label className="d-none">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="first_name"
                className={styles.Input}
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.first_name?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="last_name">
              <Form.Label className="d-none">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="last_name"
                className={styles.Input}
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.last_name?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="email">
              <Form.Label className="d-none">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                className={styles.Input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.email?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="subject">
              <Form.Label className="d-none">Subject</Form.Label>
              <Form.Control
                as="select"
                name="subject"
                className={styles.Input}
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="feedback">Feedback</option>
                <option value="park_review_proposal">Park Review Proposal</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            {errors.subject?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="message">
              <Form.Label className="d-none">Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Message"
                name="message"
                className={styles.Input}
                value={formData.message}
                onChange={handleChange}
                required
                minLength="10"
              />
            </Form.Group>
            {errors.message?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Send
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
}

export default ContactForm;