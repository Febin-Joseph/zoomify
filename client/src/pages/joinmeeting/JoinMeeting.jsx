import { useState, useEffect } from 'react';
import { Nav, MainCard, InputBtn, MainBtn } from '../../components';
import { profile } from '../../constants/icons';
import { nameVerification } from '../../middleware';

const JoinMeeting = () => {
  const [nameValidation, setNameValidation] = useState('')
  const [verificationStatus, setVerificationStatus] = useState('');
  const [nameVerified, setNameVerified] = useState(false);

  useEffect(() => {
    if (verificationStatus.includes('successful')) {
      setNameVerified(true);
    }
  }, [verificationStatus]);

  //name verification middleware
  function handleNameVerification() {
    const status = nameVerification(nameValidation);
    setVerificationStatus(status);
  }

  return (
    <div className='flex flex-col bg-[#000] h-screen'>
      <Nav value={"Join Meeting"} />

      <div className='hidden lg:flex lg:items-center lg:justify-center lg:w-[50%]
       lg:bg-[#2B2B2B] lg:flex-grow lg:pt-7'>
        <MainCard title={"Join Meeting"}>
          <div className='mt-[-30px]'>
            <p className='text-[#A1A1A1] text-[13px] text-center mb-4'>
              This Will Be Your Meeting Profile And Name
            </p>
            <img
              src={profile}
              alt="profileImg"
              className='w-[100px] m-auto items-center justify-center mb-0' />
            <InputBtn
              text={"YOUR NAME"}
              width={85}
              height={8}
              placeholder={"Enter Your Name"}
              change={(e) => setNameValidation(e.target.value)}
              value={nameValidation}
            />

            <div className='mt-0'>
              <MainBtn
                value={"Continue"}
                width={60}
                height={60}
                onClick={handleNameVerification}
                maxWidth={"max-w-[300px]"}
              />

            </div>
            <p
              className={`text-center mt-2 ${verificationStatus.includes('successful') ?
                'text-green-500' : 'text-red-500'}`}>
              {verificationStatus}
            </p>
          </div>
        </MainCard>
      </div>

      {/* This is for lg less than devices */}
      <div className='justify-center items-center lg:hidden'>
        {nameVerified ? (
          <div className='flex flex-col items-center justify-center'>
            <InputBtn
          text={"MEETING ID"}
          width={85}
          height={8}
          placeholder={"Meeting ID"}
          change={''}
          value={''}
        />

        <InputBtn
          text={"MEETING PASSWORD"}
          type={"password"}
          width={85}
          height={8}
          placeholder={"Password"}
          change={''}
          value={''}
        />

        <div className='flex items-center justify-center'>
          <p className='text-[#A1A1A1] text-[13px] lg:w-[25vw] w-[250px] text-center mt-1 mb-3'>
            Enter Meeting Credential to Join a Meeting
          </p>
        </div>

        <div className='mb-8'>
          <MainBtn
            value={"Join Meeting"}
            width={60}
            height={60}
          />
        </div>
      
          </div>
        ) : (
          <div className='mt-10'>
            <p className='text-[#A1A1A1] text-[13px] text-center mb-4'>
              This Will Be Your Meeting Profile And Name
            </p>
            <img
              src={profile}
              alt="profileImg"
              className='w-[100px] m-auto items-center justify-center mb-0' />
            <InputBtn
              text={"YOUR NAME"}
              width={85}
              height={8}
              placeholder={"Enter Your Name"}
              change={(e) => setNameValidation(e.target.value)}
              value={nameValidation}
            />

            <div className='mt-0'>
              <MainBtn
                value={"Continue"}
                width={60}
                height={60}
                onClick={handleNameVerification}
                maxWidth={"max-w-[300px]"}
              />

            </div>
            <p
              className={`text-center mt-2 ${verificationStatus.includes('successful') ?
                'text-green-500' : 'text-red-500'}`}>
              {verificationStatus}
            </p>
          </div>
        )}
      </div>

      {/* Right-Center Content for lg greater devices */}
      <div className='hidden lg:absolute lg:top-[80px] lg:right-0 lg:flex lg:flex-col
       lg:justify-center lg:items-center lg:h-[calc(100vh - 80px)] lg:w-[50%]'>
        <InputBtn
          text={"MEETING ID"}
          width={85}
          height={8}
          placeholder={"Meeting ID"}
          change={''}
          value={''}
        />

        <InputBtn
          text={"MEETING PASSWORD"}
          type={"password"}
          width={85}
          height={8}
          placeholder={"Password"}
          change={''}
          value={''}
        />

        <div className='flex items-center justify-center'>
          <p className='text-[#A1A1A1] text-[13px] lg:w-[25vw] w-[250px] text-center mt-1 mb-3'>
            Enter Meeting Credential to Join a Meeting
          </p>
        </div>

        <div className='mb-8'>
          <MainBtn
            value={"Join Meeting"}
            width={60}
            height={60}
          />
        </div>
      </div>
    </div>
  );
}

export default JoinMeeting;
