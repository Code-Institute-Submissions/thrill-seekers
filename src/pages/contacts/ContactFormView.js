import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Modal } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useHistory } from 'react-router-dom';

function ContactFormView({ match }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
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

  const handleDelete = async () => {
    try {
      await axios.delete(`https://thrill-seekers-api-5fd87044d4ac.herokuapp.com/api/contact/${id}/`);
      setShowDeleteModal(false);
      history.push('/');  // Redirect to home page after deletion
    } catch (error) {
      console.error('Error deleting contact form:', error);
    }
  };

  const handleConfirmData = () => {
    history.push('/');  // Redirect to home page
  };

  return (
    <Container className={`${appStyles.Content} p-4`}>
      <h1 className={styles.Header}>Review your transmitted data</h1>
      <Form>
        <Form.Group controlId="first_name">
          <Form.Label className={styles.Label}>First Name</Form.Label>
          <Form.Control type="text" value={formData.first_name || ''} readOnly />
        </Form.Group>

        <Form.Group controlId="last_name">
          <Form.Label className={styles.Label}>Last Name</Form.Label>
          <Form.Control type="text" value={formData.last_name || ''} readOnly />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label className={styles.Label}>Email</Form.Label>
          <Form.Control type="email" value={formData.email || ''} readOnly />
        </Form.Group>

        <Form.Group controlId="subject">
          <Form.Label className={styles.Label}>Subject</Form.Label>
          <Form.Control type="text" value={formData.subject || ''} readOnly />
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label className={styles.Label}>Message</Form.Label>
          <Form.Control as="textarea" rows={3} value={formData.message || ''} readOnly />
        </Form.Group>

        <div className="d-flex justify-content-center mt-3">
          <Button
            className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.ButtonContact} mx-2`}
            onClick={() => history.push(`/contact/edit/${id}`)}
          >
            Edit
          </Button>

          <Button
            className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.ButtonContact} mx-2`}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>

          <Button
            className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.ButtonContact} mx-2`}
            onClick={handleConfirmData}
          >
            Confirm Data
          </Button>
        </div>
      </Form>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this contact form?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ContactFormView;