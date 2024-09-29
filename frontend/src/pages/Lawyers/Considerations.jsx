import React from 'react';
import { Link } from 'react-router-dom';

function Considerations() {
  return (
    <div className="p-4 bg-lime-700 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 md:mb-5">
          Considerations When Choosing A Lawyer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex space-x-4">
            {/* Using relative paths for SVGs in the public folder */}
            <img src="/svgs/info-1.svg" alt="Response and Communication" className="w-16 h-16" />
            <div>
              <h3 className="text-xl font-semibold mb-1">Response and Communication</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Did the attorney or law firm respond promptly?</li>
                <li>Did you get to speak to an attorney directly or with a receptionist?</li>
              </ul>
            </div>
          </div>

          <div className="flex space-x-4">
            <img src="/svgs/info-2.svg" alt="Trustworthiness and Compatibility" className="w-16 h-16" />
            <div>
              <h3 className="text-xl font-semibold mb-1">Trustworthiness and Compatibility</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Is the lawyer telling you what you want to hear or being straightforward and honest?</li>
                <li>Do you trust his/her advice?</li>
                <li>Are you compatible?</li>
              </ul>
            </div>
          </div>

          <div className="flex space-x-4">
            <img src="/svgs/info-3.svg" alt="Professional Experience, Academics, and Community Service" className="w-16 h-16" />
            <div>
              <h3 className="text-xl font-semibold mb-1">Professional Experience, Academics, and Community Service</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Has the lawyer handled your specific issue before? If so, what were the results?</li>
                <li>What associations and affiliations does the attorney have?</li>
                <li>Which law school did the attorney attend?</li>
                <li>Is the lawyer involved in his or her community?</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center items-center mt-6">
            <Link 
              to="/signup" 
              className="bg-gray-200 text-black font-bold text-md p-4 rounded-md hover:bg-lime-800 hover:text-white"
            >
              CLAIM YOUR PROFILE NOW!
            </Link>
          </div>

        </div>
        
      </div>
    </div>
  );
}

export default Considerations;
