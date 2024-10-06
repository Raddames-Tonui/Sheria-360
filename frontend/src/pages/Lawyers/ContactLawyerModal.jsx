// ContactForm.js
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-hot-toast'; 

const ContactLawyerModal = ({ showContactForm, setShowContactForm, work_email }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_u2eng7g', 'template_88yjp5h', form.current, 'RlUTpTp2Kj8YRExYO')
      .then(
        () => {
          toast.success('Message sent successfully!'); // Show success toast
          setShowContactForm(false);
        },
        (error) => {
          toast.error('Failed to send message. Please try again.'); // Show error toast
        //   console.error('FAILED...', error); 
        }
      );
  };

  if (!showContactForm) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mt-6 md:w-[60vw] bg-white p-6 rounded-md shadow-lg">
        <form ref={form} onSubmit={sendEmail}>
          <input type="hidden" name="work_email" value={work_email} />
          <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-lime-500 focus:border-lime-500"
            placeholder="Jon Doe"
            required
          />
          <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2 mt-4">
            Your Email
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-lime-500 focus:border-lime-500"
            placeholder="your@email.com"
            required
          />
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 mt-4">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-lime-500 focus:border-lime-500"
            placeholder="Type your message here..."
            rows="4"
            required
          />
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lime-600 hover:bg-lime-700 "
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={() => setShowContactForm(false)}
              className="ml-2 w-full py-2 px-4 border border-gray-300 bg-gray-400 rounded-md shadow-sm text-sm font-medium text-white  hover:bg-gray-400 "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactLawyerModal;
