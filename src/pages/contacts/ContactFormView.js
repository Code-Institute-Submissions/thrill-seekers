import React, { useState, useEffect } from 'react';
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Container, Alert, Modal } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useHistory, useParams } from 'react-router-dom';

function ContactFormView() {
  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const { edit_token } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axiosReq.get(`/contact/update/${edit_token}/`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching contact form data:', error);
        history.push('/');
      }
    };

    fetchFormData();
  }, [edit_token, history]);

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/contact/update/${edit_token}/`);
      setShowDeleteModal(false);
      localStorage.removeItem('contactFormEditToken');
      history.push('/');
    } catch (error) {
      console.error('Error deleting contact form:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  };

  const handleConfirmData = () => {
    setShowConfirmMessage(true);
    setTimeout(() => {
      setShowConfirmMessage(false);
      localStorage.removeItem('contactFormEditToken');
      history.push('/');
    }, 1000); // 1 second
  };

  return (
    <Container className={`${appStyles.Content} p-4`}>
      <h1 className={styles.Header}>Review your transmitted data</h1>
      {showConfirmMessage && (
        <Alert variant="success">
          Your data has been irrevocably saved.
        </Alert>
      )}
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
            onClick={() => history.push(`/contact/update/${edit_token}`)}
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