import React, { useState } from 'react';
import { zoomifyLogo } from '../../../constants/icons';
import OTPBtn from '../../unusual/OTPBtn';

const OTPcard = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [isOTPEnabled, setIsOTPEnabled] = useState(true);

  const handleVerifyOTP = () => {
    if (otp.join('') === '1234') {
      console.log('OTP verified. Navigating to home...');
    } else {
      console.log('Invalid OTP. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsOTPEnabled(false);
  };

  return (
    <div className='flex justify-center items-center
      absolute top-0 bottom-0 right-0 left-0
       md:mr-7 md:top-[220px] md:left-[200px]'>
      {isOTPEnabled && (
        <div className='min-w-[320px] max-w-[330px] h-[340px] bg-[#1F1D1D] rounded-[40px]
       flex flex-col items-center pt-7'>
          <img
            src={zoomifyLogo}
            alt="zoomify"
            className='md:w-[12vw] h-[50px]'
          />
          <p className='text-[12px] text-[#A1A1A1] font-semibold mt-2'>
            ENTER THE VERIFICATION CODE SEND TO
          </p>
          <p className='text-[13px] text-[#FBFBFB] font-bold'>
            febinachu123@gmail.com
          </p>
          <div className='flex flex-row'>
            <OTPBtn />
            <OTPBtn />
            <OTPBtn />
            <OTPBtn />
          </div>
          <p className='text-[#A1A1A1] text-[14px] mt-6'>
            Didn’t get a code?
            <a href="https://google.com" className='text-[#FFFFFF] ml-1'>
              Click here to resend.
            </a>
          </p>
          <span className='w-full h-[0.5px] bg-[#FFFFFF] mt-2' />
          <div className='mt-4 space-x-6 text-white font-bold text-center'>
            <button
              className='bg-[#1A6093] w-[115px] h-[45px] rounded-[13px]'
              onClick={handleVerifyOTP}>
              Verify
            </button>
            <button
              className='bg-[#DE5247] w-[115px] h-[45px] rounded-[13px]'
              onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OTPcard;