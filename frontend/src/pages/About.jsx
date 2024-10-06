import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="p-4 h-[90vh] flex items-center justify-center">
      <div className='bg-gray-100 m-2 h-[82vh] border border-gray-300 shadow-md p-4 overflow-y-auto'>
        <Link to="/" className="flex justify-center mb-4">
          <img src="/logo/Sheria360.png" alt="Sheria 360 Logo" className="object-cover h-16 w-40" />
        </Link>
        <h1 className='text-2xl font-bold text-center underline text-lime-700 pb-3 md:text-3xl'>About</h1>
        <p className="mb-2 text-center text-sm md:text-base">
          Sheria 360 is a comprehensive platform dedicated to empowering citizens 
          by providing accessible legal information and resources. Our mission is 
          to bridge the gap between individuals and the legal system, ensuring that 
          everyone has the support they need to navigate their legal challenges effectively.
        </p>
        <h2 className="text-xl font-bold text-center underline text-lime-700 pb-3 md:text-2xl">Key Features:</h2>
        <ul className="list-disc list-inside mb-2 flex flex-col justify-center">
          <li className="text-sm md:text-base">Comprehensive legal information available at your fingertips.</li>
          <li className="text-sm md:text-base">Connection to qualified legal aid services for case assistance.</li>
          <li className="text-sm md:text-base">Real-time tracking of court cases, keeping users informed.</li>
          <li className="text-sm md:text-base">User-friendly interface designed for all citizens.</li>
          <li className="text-sm md:text-base">Resources and guides to help users understand their rights.</li>
        </ul>
        <p className='font-semibold text-center pt-6 text-sm md:text-base'>
          At Sheria 360, we believe in a just and accessible legal system for all. 
          Join us in transforming the way citizens interact with legal services and 
          empowering them to take charge of their legal journey.
        </p>
      </div>
    </div>
  );
}

export default About;
