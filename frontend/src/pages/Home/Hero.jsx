import React from 'react';

const Hero = () => {
  return (
    <div className="mt-4 mx-4 sm:mx-0 ">
      {/* Container with background image */}
      <div 
        style={{ backgroundImage: `url("/Images/AJS.jpg")` }}
        className="w-full h-80 bg-cover bg-center rounded-lg"
        aria-label="Hero section"
      >
      </div>
    </div>
  );
}

export default Hero;
