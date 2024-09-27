import React from 'react';

const AreYouALawyerModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-4 text-lime-700 text-center">Are you a lawyer?</h2>

        {/* Benefits List */}
        <div className="space-y-6">
          {/* <div className="flex items-start space-x-4">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/visibility.png"
              alt="Visibility Icon"
              className="w-8 h-8"
            />
            <div>
              <h3 className="font-bold">Up to 76x More Visibility</h3>
              <p>Claimed & complete profiles get up to 76x more visibility.</p>
            </div>
          </div> */}

          <div className="flex items-start space-x-4">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/user.png"
              alt="Profile Photo Icon"
              className="w-8 h-8"
            />
            <div>
              <h3 className="font-bold">Create Your Law Profile</h3>
              <p>Include a high-quality photo of yourself to enhance trust-building with potential clients.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/contact-card.png"
              alt="Contact Info Icon"
              className="w-8 h-8"
            />
            <div>
              <h3 className="font-bold">Update Contact Info</h3>
              <p>
                Opportunities to update phone number, email, and office
                location(s) anytime to receive your leads.
              </p>
            </div>
          </div>

          

          <div className="flex items-start space-x-4">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/work.png"
              alt="Experience Icon"
              className="w-8 h-8"
            />
            <div>
              <h3 className="font-bold">Showcase Your Experience</h3>
              <p>
                Offer potential clients additional insights into your specific
                areas of knowledge.
              </p>
            </div>
          </div>

          {/* <div className="flex items-start space-x-4">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/gift.png"
              alt="Benefits Icon"
              className="w-8 h-8"
            />
            <div>
              <h3 className="font-bold">Enjoy Sheria 360 Connect Benefits</h3>
              <p>Enjoy your Sheria 360 Connect benefits, with the opportunity to become a Pro!</p>
            </div>
          </div> */}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            Not a Lawyer
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-lime-600 hover:bg-lime-600 text-white rounded-md"
          >
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouALawyerModal;
