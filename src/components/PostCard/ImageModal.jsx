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

Modal.setAppElement('#root'); 

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {

    const customStyles = {
        content: {
          width: '400px', 
          height: '300px', 
          margin: 'auto', 
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
