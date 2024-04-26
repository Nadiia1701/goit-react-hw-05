import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#000', 
    border: 'none', 
    maxWidth: '90%', 
    maxHeight: '90%',
    overflow: 'auto', 
  },
};

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onRequestClose, imageUrlLarge }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Image Modal">
            <img src={imageUrlLarge} alt="Large" />
        </Modal>
    );
}