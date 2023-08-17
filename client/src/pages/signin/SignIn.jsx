import React from 'react'
import { Nav } from '../../components'

const SignIn = () => {
  return (
    <div className='flex flex-col bg-[#000] h-screen'>
      <Nav value={"Sign In"} />
      <div className='md:w-[50%] md:bg-[#2B2B2B] md:flex-grow'>
      </div>
    </div>
  )
}

export default SignIn