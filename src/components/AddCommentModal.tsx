import React, {useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 1000},
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999
    }
};

type TProps = {
    isModalOpen: boolean,
    closeModal: (event) => void,
    onSubmit: Function
}

function AddCommentModal({isModalOpen, closeModal, onSubmit}:TProps) {
    const [msg, setMsg] = useState<string>('');
    return <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
    >

        <h2>Add a Comment</h2>
        <button onClick={closeModal}>close</button>

        <input type="text" placeholder="Your comment" value={msg} onChange={e => setMsg(e.target.value)}/>
        <button onClick={() => onSubmit(msg)}>Submit</button>

    </Modal>
}

export default AddCommentModal;