import React from 'react'
import { zoomifyLogo } from '../../../constants/icons'

const Logo = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-12'>
      <img src={zoomifyLogo} alt="logo" className='w-[60%]'/>
    </div>
  )
}

export default Logo