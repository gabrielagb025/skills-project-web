import './RatingModal.css';
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Star from '../Star/Star';

const RatingModal = ({ show, handleClose, handleSubmit, handleChange, newRating, handleStarClick }) => {

    console.log(newRating)

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
                        <div className="star-rating">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    selected={index < newRating.score}
                                    onSelect={() => handleStarClick(index + 1)}
                                />
                            ))}
                        </div>
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
