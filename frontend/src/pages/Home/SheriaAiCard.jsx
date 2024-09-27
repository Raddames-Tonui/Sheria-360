import React from 'react'
import { Link } from 'react-router-dom'

const SheriaAiCard = () => {
  return (
    <div className='grid grid-cols-2 my-8 px-20 py-8'>
        <div>
            <h2 className='text-7xl font-bold leading-snug'>Access legal information with<br></br> <span className='text-lime-700'>Sheria</span><span className='text-amber-400'>Ai</span>!</h2>
        </div>
        <div className='h-72 bg-lime-300 rounded-lg relative px-4 py-8'>
            <h2 className=' text-lg leading-widest'>Whether you need quick legal advice, want to track your case, or understand your rights, Sheria AI has you covered. Your virtual legal assistant is available 24/7 to provide accurate and reliable guidance based on Kenyan law. Take control of your legal journey today</h2>
            <Link to="/sheria/chat" className='absolute bottom-4 right-4 bg-lime-800 text-white font-bold text-lg rounded-md px-4 py-2 shadow-lg hover:bg-lime-700 transition duration-200'>
          Try Sheria AI
        </Link>
        </div>
    </div>
  )
}

export default SheriaAiCard