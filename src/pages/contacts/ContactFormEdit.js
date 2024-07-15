import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useHistory } from 'react-router-dom';

function ContactFormEdit({ match }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const id = match.params.id;
  const history = useHistory();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`https://thrill-seekers-api-5fd87044d4ac.herokuapp.com/api/contact/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching contact form data:', error);
      }
    };

    fetchFormData();
  }, [id]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        history.push(`/contact/view/${id}`);
      }, 1000); // 1000 ms = 1 seconds

      return () => clearTimeout(timer);
    }
  }, [success, history, id]);

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

    try {
      await axios.put(`https://thrill-seekers-api-5fd87044d4ac.herokuapp.com/api/contact/${id}/`, formData);
      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <Container className={`${appStyles.Content} p-4`}>
      <h1 className={styles.Header}>Edit Contact Form</h1>
      {success && <Alert variant="success">Contact form updated successfully!</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="first_name">
          <Form.Label className={styles.Label}>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            className={styles.Input}
            value={formData.first_name || ''}
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
          <Form.Label className={styles.Label}>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            className={styles.Input}
            value={formData.last_name || ''}
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
          <Form.Label className={styles.Label}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            className={styles.Input}
            value={formData.email || ''}
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
          <Form.Label className={styles.Label}>Subject</Form.Label>
          <Form.Control
            as="select"
            name="subject"
            className={styles.Input}
            id={styles.subjectField}
            value={formData.subject || ''}
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
          <Form.Label className={styles.Label}>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            className={styles.Input}
            value={formData.message || ''}
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
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

export default ContactFormEdit;