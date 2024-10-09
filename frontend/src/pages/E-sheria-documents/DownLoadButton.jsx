import React, { useState } from 'react';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import MpesaPayment from './MpesaPayment'; // Import your payment component

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

            {showPayment && (
                <MpesaPayment onClose={() => setShowPayment(false)} />
            )}
        </div>
    );
};

export default DownloadButton;
