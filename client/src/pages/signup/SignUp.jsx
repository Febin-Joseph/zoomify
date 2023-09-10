import React, { useState, useEffect } from 'react';
import { Nav, MainCard, InputBtn, MainBtn, Notification } from '../../components';
import Rightside from './Rightside';
import { ageVerification } from '../../middleware';
import { GoogleLogo } from '../../constants/icons';
import { GithubLogo } from '../../constants/icons';

const SignUp = () => {
  const [birthYear, setBirthYear] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    if (verificationStatus.includes('successful')) {
      setAgeVerified(true);
    }
  }, [verificationStatus]);

  //age verification middleware
  function handleAgeVerification() {
    const status = ageVerification(birthYear);
    setVerificationStatus(status);
  }


  return (
    <div className='flex flex-col bg-[#000] min-h-screen max-h-full'>
      <Nav value={"Sign Up"} />

      {verificationStatus ? (
        <div className='fixed top-14 z-10 right-2'>
          <Notification verificationStatus={verificationStatus} />
        </div>
      ) :
        null
      }

      {/* Age Verification Section */}
      <div className='hidden lg:flex lg:items-center lg:justify-center lg:w-[50%]
       lg:bg-[#2B2B2B] lg:flex-grow lg:pt-7'>
        <MainCard title={"Sign Up"}>
          <InputBtn
            text={"VERIFY YOUR AGE"}
            width={85}
            height={8}
            placeholder={"Birth Year"}
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
          </div>
        </MainCard>
      </div>

      {/* This is for lg less than devices */}
      <div className='justify-center items-center lg:hidden mt-[-23px]'>
        {ageVerified ? (
          <div className='flex items-center justify-center'>
            <Rightside
              value1={"Sign Up With Google"}
              logo1={GoogleLogo}
              value2={"Sign Up With Github"}
              logo2={GithubLogo}
            />
          </div>
        ) : (
          <div>
            <InputBtn
              text={"VERIFY YOUR AGE"}
              width={85}
              height={8}
              placeholder={"Birth Year"}
              change={(e) => setBirthYear(e.target.value)}
              value={birthYear}
              props={inputMode="numeric"}
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
                maxWidth={"max-w-[300px]"}
              />
              <p
                className={`text-center mt-2 ${verificationStatus.includes('successful') ?
                  'text-green-500' : 'text-red-500'}`}>
                {verificationStatus}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right-Center Content for lg greater devices */}
      <div className='hidden lg:absolute lg:top-[80px] lg:right-0 lg:flex lg:flex-col
       lg:justify-center lg:items-center lg:h-[calc(100vh - 80px)] lg:w-[50%]'>
        <Rightside
          value1={"Sign Up With Google"}
          logo1={GoogleLogo}
          value2={"Sign Up With Github"}
          logo2={GithubLogo}
        />
      </div>
    </div>
  );
}

export default SignUp;
