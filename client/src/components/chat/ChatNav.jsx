import React, { useState } from 'react';

const ChatNav = () => {
  const [activeButton, setActiveButton] = useState('roomchat');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div>
      <div className='top-14 justify-center left-6 absolute w-[87%] h-[60px] bg-white rounded-[50px]'>
        <div className='w-[55%] h-[100%] rounded-[50px] right-0'>
          <div
            className={`w-[50%] h-[100%] float-left cursor-pointer ${
              activeButton === 'roomchat' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            onClick={() => handleButtonClick('roomchat')}
          >
            RoomChat
          </div>
          <div
            className={`w-[50%] h-[100%] float-left cursor-pointer ${
              activeButton === 'participants' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            onClick={() => handleButtonClick('participants')}
          >
            Participants
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>
      </div>
      <div className={`w-[55%] h-[100%] rounded-[50px] right-0 ${activeButton === 'roomchat' ? 'bg-black' : 'bg-white'}`}>
        {/* Content for RoomChat */}
      </div>
    </div>
  );
};

export default ChatNav;
