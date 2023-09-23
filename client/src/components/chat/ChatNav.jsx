import React, { useState } from 'react';

function ChatNav({ setShowMessages }) {
  const [selectedButton, setSelectedButton] = useState('roomchat');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    if (button === 'participants') {
        // Hide messages when Participants button is clicked
        setShowMessages(false);
    } else {
        // Show messages for other buttons
        setShowMessages(true);
    }
};

  return (
    <div className='top-12 left-6 absolute w-[87%] h-[60px] 
    max-h-[65px] max-w-[350px] bg-white rounded-[50px]'>
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