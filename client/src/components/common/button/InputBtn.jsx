import { useState } from 'react';

const InputBtn = ({ text, width, height, placeholder }) => {
  const [inputBox, setInputBox] = useState('');

  const inputStyle = {
    width: width ? `${width}vw` : '90px',
    height: height ? `${height}vw` : '76px',
  };

  return (
    <div className='flex flex-col items-center mt-10 lg:mt-0'>
      <p
        className='text-[#FBFBFB] text-[15px] text-left mb-2 mr-56'>
        {text}
      </p>
      <div className='relative'>
        <input
          type="text"
          style={inputStyle}
          className={`rounded-[15px] mb-4 bg-[#EDEDED] max-w-[380px] 
            lg:max-w-[380px] min-h-[7vh] max-h-[52px] text-[#7E7E7E]
            font-semibold text-center ${inputBox ? 'text-black' : ''}`}
          value={inputBox}
          onChange={(e) => setInputBox(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default InputBtn;