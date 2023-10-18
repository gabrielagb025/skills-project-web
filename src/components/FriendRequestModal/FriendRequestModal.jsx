import './FriendRequestModal.css';
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

const FriendRequestModal = ({ show, handleClose, handleSubmit, handleChange, message }) => {
    console.log('FriendRequestModal')
  return (
    <Modal className="friend-modal-container" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Envía una solicitud de amistad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="friendRequestMessage">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              type="text"
              placeholder="¡Hola! Me gustaría conectar contigo."
              name="message"
              value={message}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
          <Button className="submit-btn" variant="primary" type="submit">
            Enviar solicitud
          </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FriendRequestModal;


