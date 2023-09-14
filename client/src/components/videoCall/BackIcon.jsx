import React from 'react'
import { gobtn } from '../../constants/icons'

const BackIcon = () => {
  return (
    <div className='bg-white rounded-[50%] w-[65px] h-[63px] flex items-center justify-center'>
      <img
        src={gobtn}
        alt="BackBtn"
        className='transform rotate-180 -ml-1'
      />
    </div>
  )
}

export default BackIcon