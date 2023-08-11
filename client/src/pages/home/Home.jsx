import React from 'react'
import { HomeCard, Logo } from '../../components'

const Home = () => {
  const gradientStyle = {
    background: 'linear-gradient(134deg, #000 0%, #35669F 47.85%, #000 90%)',
  };

  return (
    <div style={gradientStyle} className="h-screen">
      <p className='text-[#FBFBFB] text-[65px] md:text-[120px] font-medium
       md:font-normal text-left p-9 pt-[70px] leading-[65px] flex-col'>
        Connect With
      </p>

      <p className='text-[#D7D7D7] text-center text-[27px]
       font-semibold pt-0'>
        Anyone, Anywhere, AnyTime
      </p>
      <HomeCard />
      <Logo />
    </div>
  )
}

export default Home