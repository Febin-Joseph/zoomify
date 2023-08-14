import React from 'react'
import { HomeCard, Logo } from '../../components'

const Home = () => {
  const gradientStyle = {
    background: 'linear-gradient(134deg, #000 0%, #35669F 47.85%, #000 90%)',
  };

  return (
    <div style={gradientStyle} className="min-h-screen">
      <div className='text-[#FBFBFB] text-[50px] md:text-[120px]
      font-medium text-left p-5 pl-7 pt-[45px] leading-[50px]'>
        <p>
          Connect
        </p>
        <p>With</p>
      </div>

      <div className='-mt-4'>
        <p className='text-[#D7D7D7] text-center text-[1.5rem]
       font-semibold pt-0'>
          Anyone, Anywhere, AnyTime
        </p>
        <Logo />
      </div>
      <HomeCard />
    </div>
  )
}

export default Home
