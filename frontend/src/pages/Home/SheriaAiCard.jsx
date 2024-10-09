import React from 'react';
import { Link } from 'react-router-dom';

const SheriaAiCard = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-12 px-6 md:px-24 py-10'>
      <div>
        <h2 className='text-4xl md:text-6xl font-bold leading-tight mb-6'>
          Access legal information with <br /> 
          <span className='text-lime-700'>Sheria</span>
          <span className='text-amber-400'>Ai</span>!
        </h2>
      </div>
      <div className='h-60 bg-lime-300 rounded-xl shadow-lg relative px-6 py-10'>
      <h2 className='text-base md:text-lg leading-relaxed'>
  Whether you need <strong>quick legal advice</strong>, want to <strong>track your case</strong>, or <strong>understand your rights</strong>, 
  Sheria AI has you covered. Your <strong>virtual legal assistant</strong> is available <strong>24/7</strong> to provide accurate 
  and reliable guidance based on <strong>Kenyan law</strong>. Take control of your legal journey today.
</h2>

        {/* <Link 
          to="/sheria/chat" 
          className='absolute bottom-6 right-6 bg-lime-800 text-white font-bold text-md md:text-lg rounded-lg px-5 py-3 shadow-md hover:bg-lime-700 transition duration-300 ease-in-out'
        >
          Try Sheria AI
        </Link> */}
      </div>
    </div>
  );
};

export default SheriaAiCard;
