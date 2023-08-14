import React from 'react'
import HomeBtn from '../button/HomeBtn';

const HomeCard = () => {
  return (
    <div>
      <div className='bg-[#1F1D1D] w-[100%] h-screen sm:w-[320px] sm:h-[360px] 
    sm:bottom-[100%] justify-center items-center rounded-[40px] absolute
    md:bottom-[50%] bottom-0 sm:right-[0] rounded-b-none overflow-hidden'>

        <div className='justify-center items-center ml-[5%] mr-[5%] text-white
        font-bold text-center pt-4 text-[23px] leading-9 mb-4'>
          <p>Welcome</p>
          <p className='text-[15px]'>Get Started With Your Account</p>
        </div>

        <div className='justify-center items-center inset-0'>
          <HomeBtn value={"Join Meeting"} width={90} height={70} />
          <HomeBtn value="Sign in" width={80} height={70} />
          <HomeBtn value="Sign up" width={70} height={70} />
        </div>
      </div>

    </div>
  )
}

export default HomeCard;