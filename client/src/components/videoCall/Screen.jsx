import React, { useState } from 'react';
import { profile } from '../../constants/icons';
import { TiMicrophone } from 'react-icons/ti';
import { BiSolidMicrophoneOff } from 'react-icons/bi';
import { PiVideoCameraFill, PiVideoCameraSlashFill } from 'react-icons/pi';

const Screen = ({ children, screenOff, trackState }) => {
  const userName = () => {
    let name = localStorage?.getItem('_userName');
    if (!name || name == null) {
      name = "user";
      return name;
    } else {
      return name;
    }
  };

  return (
    <>
      {screenOff ? (
        <div className={`w-48 h-36 md:w-72 md:h-60 relative rounded-[10px] bg-gray-900 overflow-hidden`}>
          <img src={profile} alt="profileImg" className='w-[90px] m-auto items-center justify-center mb-2 mt-8' />
          <h1 className='text-white text-[32px] text-center justify-center mt-1'>{userName()}</h1>
        </div>
      ) : (
        <div className='w-48 h-36 md:w-72 md:h-60 relative rounded-[10px] bg-black overflow-hidden'>
          {children}
          <h1 className='text-white text-[32px] text-center justify-center mt-1'>{userName()}</h1>
          <div className='flex flex-row gap-3 mt-3 ml-4'>
            {trackState && trackState.audio ? (
              <TiMicrophone size={30} />
            ) : (
              <BiSolidMicrophoneOff size={30} color='red' />
            )}
            {trackState && trackState.video ? (
              <PiVideoCameraFill size={30} />
            ) : (
              <PiVideoCameraSlashFill size={30} color='red' />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Screen;