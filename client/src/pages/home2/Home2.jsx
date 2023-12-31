import React from 'react'
import { HomeCard, Logo } from '../../components'

const Home2 = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-between items-center
    bg-gradient-to-b from-black via-[#35669F] to-black md:h-100%">
        <div>
          <div className='text-[#FBFBFB] text-[12vw] font-medium text-left
        p-5 pl-7 pt-[45px] leading-[100%] mr-[35vw]
        md:text-[7vw] md:mr-[50vw] md:mt-[30vh]'>
            <p>
              Connect
            </p>
            <p>With</p>
          </div>

          <div className='-mt-4'>
            <p className='text-[#D7D7D7] text-center text-[5vw]
            font-semibold pt-5
            md:text-[2vw] md:mr-[48vw] '>
              Anyone, Anywhere, AnyTime
            </p>
            <Logo />
          </div>
        </div>
        <HomeCard
          isAuthenticated={true}
        />
      </div>
    </div>
  )
}

export default Home2