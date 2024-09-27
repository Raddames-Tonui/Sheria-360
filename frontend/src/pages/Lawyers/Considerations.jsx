import React from 'react';
import logo from '../../assets/svgs/info-2.svg'; // Import as a file

function Considerations() {
  return (
    <div className="p-4 bg-[#162F25] text-white  ">
        <div className=' '>       
            <div className="flex items-center mb-4">
                {/* Render the SVG as an image */}
                <img src={logo} alt="Logo" className="w-12 h-12 mr-4" />
                <h2 className="text-2xl font-bold">Considerations When Choosing A Lawyer</h2>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">Response and Communication</h3>
                <ul className="list-disc list-inside space-y-1">
                <li>Did the attorney or law firm respond promptly?</li>
                <li>Did you get to speak to an attorney directly or with a receptionist?</li>
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">Trustworthiness and Compatibility</h3>
                <ul className="list-disc list-inside space-y-1">
                <li>Is the lawyer telling you what you want to hear or being straightforward and honest?</li>
                <li>Do you trust his/her advice?</li>
                <li>Are you compatible?</li>
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">Professional Experience, Academics, and Community Service</h3>
                <ul className="list-disc list-inside space-y-1">
                <li>Has the lawyer handled your specific issue before? If so, what were the results?</li>
                <li>What associations and affiliations does the attorney have?</li>
                <li>Which law school did the attorney attend?</li>
                <li>Is the lawyer involved in his or her community?</li>
                </ul>
            </div>
      </div>
    </div>
  );
}

export default Considerations;
