import React from 'react'
import LegalSearch from './Lawyers/LegalSearch'
import PracticeAreas from './Lawyers/PracticeAreas'
import PracticeLocations from './Lawyers/PracticeLocations'

function Lawyers() {
  return (
    <div>
        <LegalSearch/>
        <PracticeAreas/>
        <PracticeLocations/>
    </div>
  )
}

export default Lawyers