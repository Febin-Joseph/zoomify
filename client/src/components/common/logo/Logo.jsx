import React from 'react'
import { zoomifyLogo } from '../../../constants/icons'

const Logo = () => {
  return (
    <div className='flex items-center justify-center mt-3'>
      <img src={zoomifyLogo} alt="logo" className='min-w-[58%] max-w-[60%]'/>
    </div>
  )
}

export default Logo