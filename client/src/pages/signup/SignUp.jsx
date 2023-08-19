import React, { useState } from 'react';
import { Nav, MainCard, InputBtn, MainBtn } from '../../components';
import { ageVerification } from '../../middleware';

const SignUp = () => {
  const [birthYear, setBirthYear] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  
  function handleAgeVerification() {
    const verificationStatus = ageVerification(birthYear); // Call the ageVerification function
    setVerificationStatus(verificationStatus);
  }

  return (
    <div className='flex flex-col bg-[#000] h-screen'>
      <Nav value={"Sign Up"} />
      <div
        className='hidden lg:flex lg:items-center lg:justify-center
       lg:w-[50%] lg:bg-[#2B2B2B] lg:flex-grow lg:pt-7'>

        <MainCard title={"Sign Up"}
          renderInputBtn={() => (
            //This input is for showing in the left side in lg greater devices
            <InputBtn
              text={"VERIFY YOUR AGE"}
              width={85}
              height={8}
              placeholder={"Birth Date"}
              change={(e) => setBirthYear(e.target.value)}
              value={birthYear}
            />
          )}
        >
          <p className='text-[#A1A1A1] text-[13px] text-center mt-2'>
            Please confirm Your Birth Year. This data will not be stored.
          </p>

          <div className='mt-5'>
            <MainBtn
              value={"Continue"}
              width={60}
              height={60}
              onClick={handleAgeVerification}
            />
            <p className={`text-center mt-2 ${verificationStatus.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{verificationStatus}</p>
          </div>
        </MainCard>
      </div>

      {/* This is for lg less than devices input box */}
      <div className='justify-center items-center lg:hidden'>
        <InputBtn
          text={"VERIFY YOUR AGE"}
          width={85}
          height={8}
          placeholder={"Birth Date"}
          change={(e) => setBirthYear(e.target.value)}
          value={birthYear}
        />
        <p className='text-[#A1A1A1] text-[13px] text-center mt-2'>
          Please confirm Your Birth Year. This data will not be stored.
        </p>

        <div className='mt-5'>
          <MainBtn
            value={"Continue"}
            width={60}
            height={60}
            onClick={handleAgeVerification}
          />
          <p className={`text-center mt-2 ${verificationStatus.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{verificationStatus}</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;