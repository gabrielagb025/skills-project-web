import './DescriptionModal.css';
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DescriptionModal = ({ show, handleClose, handleSubmit, handleChange, description, urls }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Publica una descripción</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={description}
                            onChange={handleChange}
                            placeholder="Agrega una descripción..."
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="urls">
                        <Form.Label>Enlaces (URLs)</Form.Label>
                        <Form.Control
                            type="text"
                            name="urls"
                            value={urls}
                            onChange={handleChange}
                            placeholder="Agrega URLs separadas por comas..."
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button className="submit-btn" variant="primary" type="submit">
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DescriptionModal;
