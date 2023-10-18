import './FriendRequestModal.css';
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const FriendRequestModal = ({ show, handleClose, handleSubmit, handleChange, message }) => {
    console.log('FriendRequestModal')
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enviar solicitud de amistad</Modal.Title>
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
          <Button variant="primary" type="submit">
            Enviar solicitud
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FriendRequestModal;


