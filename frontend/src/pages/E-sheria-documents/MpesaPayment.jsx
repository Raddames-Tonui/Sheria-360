import React, { useState } from 'react';
import { server_url } from "../../../config.json";

const MpesaPayment = ({ onClose, onSuccess }) => { // Accept onClose and onSuccess as props
    const [amount, setAmount] = useState('');
    const [phone, setPhone] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handlePayment = (e) => {
        e.preventDefault();

        fetch(`${server_url}/pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, phone })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                setResponse({
                    message: data.message,
                    details: data.details
                });
                setError(null);
                onSuccess(); // Call the onSuccess function
                onClose(); // Close the modal on success
            } else {
                throw new Error(data.message || 'An error occurred');
            }
        })
        .catch(err => {
            setError(err.message);
            setResponse(null);
        });
    };

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-semibold mb-6 text-center text-gray-800'>M-Pesa Payment</h2>
            <form onSubmit={handlePayment} className='space-y-4'>
                <div className='flex flex-col'>
                    <label htmlFor="amount" className='text-gray-700 font-medium mb-1'>Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                        required
                        min="1"
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="phone" className='text-gray-700 font-medium mb-1'>Phone Number:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                        required
                    />
                </div>
                <button
                    type="submit"
                    className='w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                >
                    Deposit
                </button>
            </form>
            {response && (
                <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                    <h3 className='text-lg font-medium text-green-800'>Response:</h3>
                    <p className='text-green-700'>{response.message}</p>
                    {response.details && (
                        <pre className='mt-2 bg-gray-100 p-2 rounded-lg'>{JSON.stringify(response.details, null, 2)}</pre>
                    )}
                </div>
            )}
            {error && (
                <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                    <h3 className='text-lg font-medium text-red-800'>Error:</h3>
                    <p className='text-red-700'>{error}</p>
                    <p>Please Enter Your MPESA Pin</p>
                </div>
            )}
        </div>
    );
};

export default MpesaPayment;
