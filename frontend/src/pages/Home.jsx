import React from 'react'
import Hero from './Home/Hero'
import LawyerSearchCard from './Home/LawyerSearchCard'
// import PracticeLocations from './Lawyers/PracticeLocations'
// import PracticeAreas from './Lawyers/PracticeAreas'
import SheriaAiCard from './Home/SheriaAiCard'

function Home() {
  return (
    <div className=''>
      <Hero/>
      <div className='px-20'>
        <LawyerSearchCard/></div>
      <SheriaAiCard/>
      {/* <div className=''>
      <PracticeLocations/>
      </div>
      <div className=''>
      <PracticeAreas/>
      </div> */}
    </div>
  )
}

export default Home