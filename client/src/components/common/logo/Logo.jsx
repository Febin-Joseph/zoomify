import React from 'react'
import { zoomifyLogo } from '../../../constants/icons'

const Logo = () => {
  return (
    <div className='flex items-center justify-center mt-5
    md:items-end md:justify-end md:ml-0 md:absolute md:right-0
    md:top-[20vh] md:mr-[10vw]'>
      <img
        src={zoomifyLogo}
        alt="logo"
        className='w-[50vw] md:min-w-[5%] md:max-w-[40vh]' />
    </div>
  )
}

export default Logo