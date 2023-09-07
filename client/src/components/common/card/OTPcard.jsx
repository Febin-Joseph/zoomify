import React from 'react';
import { zoomifyLogo } from '../../../constants/icons';

const OTPcard = () => {
  return (
    <div className='flex justify-center items-center
      absolute top-0 bottom-0 right-0 left-0
       md:mr-7 md:top-[220px] md:left-[200px]'>
      <div className='min-w-[320px] max-w-[330px] h-[340px] bg-[#1F1D1D] rounded-[40px]
       flex flex-col items-center pt-7'>
        <img
          src={zoomifyLogo}
          alt="zoomify"
          className='md:w-[12vw] h-[50px]'
        />
        <p className='text-[12px] text-[#A1A1A1] font-semibold mt-5'>
          ENTER THE VERIFICATION CODE SEND TO
        </p>
        <p className='text-[13px] text-[#FBFBFB] font-bold'>
          febinachu123@gmail.com
        </p>
      </div>
    </div>
  );
};

export default OTPcard;
