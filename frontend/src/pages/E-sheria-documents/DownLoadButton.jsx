import React, { useState } from 'react';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import MpesaPayment from './MpesaPayment'; // Import your payment component

const DownloadButton = ({ titleIndex, handleDownload }) => {
    const [showPayment, setShowPayment] = useState(false);

    const handleDownloadClick = () => {
        setShowPayment(true); // Show payment form
    };

    return (
        <div>
            <button
                className='hover:bg-lime-600 hover:text-white text-lime-600 font-semibold p-2 rounded-md flex items-center'
                onClick={handleDownloadClick}
            >
                Download <span className='pl-1'><FaArrowAltCircleDown /></span>
            </button>

            {showPayment && (
                <MpesaPayment 
                    onSuccess={() => {
                        handleDownload(titleIndex); // Call handleDownload when payment is successful
                        setShowPayment(false); // Optionally hide payment form after success
                    }}
                    onClose={() => setShowPayment(false)} // Close handler for MpesaPayment
                />
            )}
        </div>
    );
};

export default DownloadButton;
