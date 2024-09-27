import React from 'react';

const Hero = () => {
  return (
    <div className="px-20 mt-8">
      {/* Container with background image */}
      <div 
        style={{ backgroundImage: `url("/Images/AJS.jpg")` }}
        className="w-full h-80 bg-cover bg-center rounded-lg"
        aria-label="Hero section"
      >
        {/* Add content or overlay here if needed */}
      </div>
    </div>
  );
}

export default Hero;
