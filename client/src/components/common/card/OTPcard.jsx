import React, { useState } from 'react';
import { zoomifyLogo } from '../../../constants/icons';
import OTPBtn from '../../unusual/OTPBtn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTPcard = ({ email }) => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [isOTPEnabled, setIsOTPEnabled] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (value, index) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = value;
    setOTP(updatedOTP);

    // Automatically focus the next input box if the current one has a value
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Disable subsequent input boxes if the current one is empty
    for (let i = index + 1; i < 4; i++) {
      if (!value) {
        const inputToDisable = document.getElementById(`otp-input-${i}`);
        if (inputToDisable) {
          inputToDisable.disabled = true;
        }
      }
    }
  };

  const API_URL = 'https://zoomify-backend.onrender.com'

  const handleVerifyOTP = () => {
    const otpValue = otp.join('');

    const data = {
      otp: otpValue,
      email: email
    }
    axios.post(`${API_URL}/auth/verifyOtp`, data)
      .then((response) => {
        console.log('Response from the server:', response.data);
        if (response.data.message === 'OTP verified successfully') {
          navigate('/home')
        }
      })
      .catch((error) => {
        console.error('Error while verifying OTP:', error);
      });
  };

  const handleCancel = () => {
    setIsOTPEnabled(false);
  };

  return (
    <div>
      {isOTPEnabled && (
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
            <p className='text-[12px] text-[#A1A1A1] font-semibold mt-2'>
              ENTER THE VERIFICATION CODE SEND TO
            </p>
            <p className='text-[13px] text-[#FBFBFB] font-bold'>
              {email}
            </p>
            <div className='flex flex-row'>
              <OTPBtn
                handleInputChange={(value) => handleInputChange(value, 0)}
                index={0}
                disabled={false}
              />
              <OTPBtn
                handleInputChange={(value) => handleInputChange(value, 1)}
                index={1}
                disabled={!otp[0]}
              />
              <OTPBtn
                handleInputChange={(value) => handleInputChange(value, 2)}
                index={2}
                disabled={!otp[1]}
              />
              <OTPBtn
                handleInputChange={(value) => handleInputChange(value, 3)}
                index={3}
                disabled={!otp[2]}
              />
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
        </div>
      )}
    </div>
  );
};

export default OTPcard;