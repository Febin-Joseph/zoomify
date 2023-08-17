import React from 'react'
import { Nav } from '../../components'

const JoinMeeting = () => {
  return (
    <div className='flex flex-col bg-[#000] h-screen'>
      <Nav value={"Join Meeting"} />
      <div className='md:w-[50%] md:bg-[#2B2B2B] md:flex-grow'>
      </div>
    </div>
  )
}

export default JoinMeeting