import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg z-10 p-6 max-w-md mx-auto">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
