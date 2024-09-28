import React from 'react'
import { GoLaw } from "react-icons/go";


function Courts() {
  return (
    <div className='py-8 px-20'>
      <div>
        <h2 className='text-center font-bold text-5xl py-4'>Judicial Systems of Kenya</h2>
      </div>
      <div className='mt-4 '>
        <h2 className='text-4xl text-center font-bold underline decoration-4 decoration-lime-700 underline-offset-2'> Superior Courts</h2>
      <div className='grid grid-cols-3 gap-4  py-4'>
        {/*  */}
        <div className=" border-2 p-2 h-32 border-lime-700 rounded-md grid grid-cols-4">
          <GoLaw size={72}/>
          <dir className="col-span-3  ">
            <h2 className='text-3xl font-bold'> Supreme Court</h2>
          </dir>
        </div>
        
        {/*  */}
        <div className=" border-2 p-2 h-32 border-lime-700 rounded-md grid grid-cols-4">
          <GoLaw size={72}/>
          <dir className="col-span-3  ">
            <h2 className='text-3xl font-bold'> High Court</h2>
          </dir>
        </div>
        {/*  */}
        <div className=" border-2 p-2 h-32 border-lime-700 rounded-md grid grid-cols-4">
          <GoLaw size={72}/>
          <dir className="col-span-3  ">
            <h2 className='text-3xl font-bold'> Court of Appeal</h2>
          </dir>
        </div>
        {/*  */}
        <div className=" border-2 p-2 h-32 border-lime-700 rounded-md grid grid-cols-4">
          <GoLaw size={72}/>
          <dir className="col-span-3  ">
            <h2 className='text-3xl font-bold'> Employment & Labour Relations Court</h2>
          </dir>
        </div>
        {/*  */}
        <div className=" border-2 p-2 h-32 border-lime-700 rounded-md grid grid-cols-4">
          <GoLaw size={72}/>
          <dir className="col-span-3  ">
            <h2 className='text-3xl font-bold'> Environment and Land Court</h2>
          </dir>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Courts