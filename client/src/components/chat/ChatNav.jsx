import React, { useState } from 'react';

function ChatNav() {
  const [selectedButton, setSelectedButton] = useState('roomchat');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className='top-14 justify-center left-6 absolute w-[87%] h-[60px] bg-white rounded-[50px]'>
      <button
        className={`w-[50%] h-[100%] rounded-[50px] ${selectedButton === 'roomchat' ?
          'bg-black text-white' :
          ''
          }`}
        onClick={() => handleButtonClick('roomchat')}
      >
        Room Chat
      </button>
      <button
        className={`w-[50%] h-[100%] rounded-[50px] ${selectedButton === 'participants' ?
          'bg-black text-white' :
          ''
          }`}
        onClick={() => handleButtonClick('participants')}
      >
        Participants
      </button>
    </div>
  );
}

export default ChatNav;