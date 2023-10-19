import React from 'react';
import Modal from 'react-modal';
import './ImageModal.css'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root'); // Indica a React Modal dónde debe renderizar el modal en el DOM.

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {

    const customStyles = {
        content: {
          width: '400px', // Ancho fijo del modal
          height: '300px', // Altura fija del modal
          margin: 'auto', // Para centrar el modal horizontalmente
        },
      };
      
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Imagen"
        >
            <div className="modal-close-icon mb-2" onClick={onRequestClose}>
                <i class="bi bi-x-circle fs-5"></i>
            </div>
            <img id="modal-img" src={imageUrl} alt="Imagen" />
        </Modal>
    );
};

export default ImageModal;
