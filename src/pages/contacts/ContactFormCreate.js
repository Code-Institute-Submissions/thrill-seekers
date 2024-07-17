import React, { useState, useEffect } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useHistory } from 'react-router-dom';

function ContactFormCreate() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: 'feedback',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        history.push(`/contact/view/${localStorage.getItem('contactFormEditToken')}`);
      }, 1000); // 1000 ms = 1 seconds

      return () => clearTimeout(timer);
    }
  }, [success, history]);

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
      const response = await axiosReq.post('/contact/create/', formData);
      setSuccess(true);
      const editToken = response.data.edit_token;
      localStorage.setItem('contactFormEditToken', editToken);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        subject: 'feedback',
        message: ''
      });
      history.push(`/contact/view/${editToken}`);
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
          {success && <Alert variant="success">Message sent successfully! Redirecting to view page...</Alert>}
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group>
              <Form.Label className="d-none">First Name</Form.Label>
              <Form.Control
                id="first_name"
                type="text"
                placeholder="First Name"
                name="first_name"
                className={styles.Input}
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.first_name && (
              <Alert variant="warning">
                {Array.isArray(errors.first_name) ? errors.first_name[0] : errors.first_name}
              </Alert>
            )}

            <Form.Group>
              <Form.Label className="d-none">Last Name</Form.Label>
              <Form.Control
                id="last_name"
                type="text"
                placeholder="Last Name"
                name="last_name"
                className={styles.Input}
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.last_name && (
              <Alert variant="warning">
                {Array.isArray(errors.last_name) ? errors.last_name[0] : errors.last_name}
              </Alert>
            )}

            <Form.Group>
              <Form.Label className="d-none">Email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                className={styles.Input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.email && (
              <Alert variant="warning">
              {Array.isArray(errors.email) ? errors.email[0] : errors.email}
            </Alert>
            )}

            <Form.Group>
              <Form.Label className="d-none">Subject</Form.Label>
              <Form.Control
                id="subject"
                as="select"
                name="subject"
                className={styles.Input}
                id={styles.subjectField}
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="feedback">Feedback</option>
                <option value="park_review_proposal">Park Review Proposal</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            {errors.subject && (
              <Alert variant="warning">
                {Array.isArray(errors.subject) ? errors.subject[0] : errors.subject}
              </Alert>
            )}

            <Form.Group>
              <Form.Label className="d-none">Message</Form.Label>
              <Form.Control
                id="message"
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
            {errors.message && (
              <Alert variant="warning">
                {Array.isArray(errors.message) ? errors.message[0] : errors.message}
              </Alert>
            )}

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

export default ContactFormCreate;