import React from 'react'
import LegalSearch from './Lawyers/LegalSearch'
import PracticeAreas from './Lawyers/PracticeAreas'
import PracticeLocations from './Lawyers/PracticeLocations'
import Considerations from './Lawyers/Considerations'

function Lawyers() {
  return (
    <div>
        <LegalSearch/>
        <PracticeAreas/>
        <PracticeLocations/>
        <Considerations />
    </div>
  )
}

export default Lawyers