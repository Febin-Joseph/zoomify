import React from 'react'
import MainBtn from '../button/MainBtn'

const PlansCard = ({ ...props }) => {
  return (
    <div className='bg-[#262626] w-[320px] h-[450px] rounded-[20px]'>
      <p className='text-[#E3E3E3] text-[2.5vw] text-center font-medium mt-5 mb-12'>
        {props.heading}
      </p>
      <p>{props.price}</p>
      <p>{props.features}</p>
      <div>
        {/* <MainBtn /> */}
      </div>
    </div>
  )
}

export default PlansCard