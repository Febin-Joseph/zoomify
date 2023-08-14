import React from 'react';
import { HomeCard, Logo } from '../../components';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center 
    bg-gradient-to-b from-black via-[#35669F] to-black">
      <div>
        <div className='text-[#FBFBFB] text-[50px] md:text-[120px]
          font-medium text-left p-5 pl-7 pt-[45px] leading-[50px]'>
          <p>
            Connect
          </p>
          <p>With</p>
        </div>

        <div className='-mt-4'>
          <p className='text-[#D7D7D7] text-center text-[1.2rem]
            font-semibold pt-0'>
            Anyone, Anywhere, AnyTime
          </p>
          <Logo />
        </div>
      </div>
      <HomeCard />
    </div>
  );
}

export default Home;
