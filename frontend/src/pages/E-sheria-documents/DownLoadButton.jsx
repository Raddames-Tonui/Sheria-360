import React, { useState } from 'react';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import MpesaPayment from './MpesaPayment'; // Import your payment component
import Modal from './Modal'; // Import the Modal component

const DownloadButton = ({ titleIndex }) => {
    const [showPayment, setShowPayment] = useState(false);

    const handleDownload = () => {
        setShowPayment(true); // Show payment form
    };

    return (
        <div>
            <button
                className='hover:bg-lime-600 hover:text-white text-lime-600 font-semibold p-2 rounded-md flex items-center'
                onClick={handleDownload}
            >
                Download <span className='pl-1'><FaArrowAltCircleDown /></span>
            </button>

            <Modal isOpen={showPayment} onClose={() => setShowPayment(false)}>
                <MpesaPayment onClose={() => setShowPayment(false)} onSuccess={() => setShowPayment(false)} />
            </Modal>
        </div>
    );
};

export default DownloadButton;
