import React, { useState } from 'react';
import Modal from 'react-modal';

type Props = {};

const DummyPage = (props: Props) => {
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>

            {/* The Modal component from react-modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <div>Modal Content</div>
                <button onClick={closeModal}>Close Modal</button>
            </Modal>

            StudentDashboardMolecule
        </div>
    );
};

export default DummyPage;
