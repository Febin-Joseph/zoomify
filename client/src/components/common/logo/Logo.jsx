import React from 'react'
import { zoomifyLogo } from '../../../constants/icons'

const Logo = () => {
  return (
    <div className='flex items-center justify-center mt-5'>
      <img src={zoomifyLogo} alt="logo" className='min-w-[50%] max-w-[50%]'/>
    </div>
  )
}

export default Logo