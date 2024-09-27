import React from 'react'
import Hero from './Home/Hero'
import LawyerSearchCard from './Home/LawyerSearchCard'
import PracticeLocations from './Lawyers/PracticeLocations'
import PracticeAreas from './Lawyers/PracticeAreas'
import SheriaAiCard from './Home/SheriaAiCard'

function Home() {
  return (
    <div>
      <Hero/>
      <div className='px-20'>
        <LawyerSearchCard/></div>
      <SheriaAiCard/>
      <div className='px-20 bg-lime-200'>
      <PracticeLocations/>
      </div>
      <div className='px-20 '>
      <PracticeAreas/>
      </div>
    </div>
  )
}

export default Home