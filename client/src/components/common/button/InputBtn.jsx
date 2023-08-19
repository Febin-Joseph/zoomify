import React from 'react';

const InputBtn = ({ text, width, height, placeholder, value, change }) => {
  // const [inputBoxVal, setInputBoxVal] = useState('');

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
          className={`rounded-[15px] mb-4 bg-[#EDEDED] max-w-[350px] 
            lg:max-w-[350px] min-h-[7vh] max-h-[52px] text-[#7E7E7E]
            font-semibold text-center ${value ? 'text-black' : ''}`}
          value={value}
          onChange={change}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default InputBtn;