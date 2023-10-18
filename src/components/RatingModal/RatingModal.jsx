import './RatingModal.css';
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RatingModal = ({ show, handleClose, handleSubmit, handleChange, newRating }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Deja una reseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="ratingMessage">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                            type="text"
                            name="message"
                            value={newRating.message}
                            onChange={handleChange}
                            placeholder="Comentario"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ratingScore">
                        <Form.Label>Valoración</Form.Label>
                        <Form.Control
                            type="number"
                            name="score"
                            value={newRating.score}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button className="submit-btn" variant="primary" type="submit">
                            Publicar reseña
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RatingModal;
