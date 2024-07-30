import React, { useState, useEffect } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useHistory, useParams } from 'react-router-dom';

function ContactFormEdit() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { edit_token } = useParams();
  const [currentEditToken, setCurrentEditToken] = useState(edit_token);
  const history = useHistory();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axiosReq.get(`/contact/update/${currentEditToken}/`);
        setFormData(response.data);
      } catch (error) {
        // console.log('Error fetching contact form data:', error.response?.data || error.message);
        history.push('/');
      }
    };

    fetchFormData();
  }, [currentEditToken, history]);

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
      const response = await axiosReq.put(`/contact/update/${currentEditToken}/`, formData);
      setSuccess(true);
      const newEditToken = response.data.edit_token;
      localStorage.setItem('contactFormEditToken', newEditToken);
      setCurrentEditToken(newEditToken);
      setTimeout(() => {
        history.push(`/contact/view/${newEditToken}`);
      }, 2000);
    } catch (error) {
      // console.log('Error updating contact form:', error.response?.data || error.message);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <Container className={`${appStyles.Content} p-4`}>
      <h1 className={styles.Header}>Edit Contact Form</h1>
      {success && <Alert variant="success">Contact form updated successfully! Redirecting...</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group>
          <Form.Label htmlFor="first_name" className={styles.Label}>First Name</Form.Label>
          <Form.Control
            id="first_name"
            type="text"
            name="first_name"
            className={styles.Input}
            value={formData.first_name || ''}
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
          <Form.Label htmlFor="last_name" className={styles.Label}>Last Name</Form.Label>
          <Form.Control
            id="last_name"
            type="text"
            name="last_name"
            className={styles.Input}
            value={formData.last_name || ''}
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
          <Form.Label htmlFor="email" className={styles.Label}>Email</Form.Label>
          <Form.Control
            id="email"
            type="email"
            name="email"
            className={styles.Input}
            value={formData.email || ''}
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
          <Form.Label htmlFor="subject" className={styles.Label}>Subject</Form.Label>
          <Form.Control
            id="subject"
            as="select"
            name="subject"
            className={styles.Input}
            value={formData.subject || ''}
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
          <Form.Label htmlFor="message" className={styles.Label}>Message</Form.Label>
          <Form.Control
            id="message"
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
        {errors.message && (
          <Alert variant="warning">
            {Array.isArray(errors.message) ? errors.message[0] : errors.message}
          </Alert>
        )}

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
