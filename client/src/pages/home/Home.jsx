import React from 'react'
import { HomeCard, Logo } from '../../components'

const Home = () => {
  const gradientStyle = {
    background: 'linear-gradient(134deg, #000 0%, #35669F 47.85%, #000 90%)',
  };

  return (
    <div style={gradientStyle} className="min-h-screen">
      <p className='text-[#FBFBFB] text-[57px] md:text-[120px] font-medium
      text-left p-5 pt-[70px] leading-[65px]'>
        Connect With
      </p>

      <p className='text-[#D7D7D7] text-center text-[23px]
       font-semibold pt-0'>
        Anyone, Anywhere, AnyTime
      </p>
      <HomeCard />
      <Logo />
    </div>
  )
}

export default Home