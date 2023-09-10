import React from 'react';

const InputBtn = ({ text, width, height, placeholder, value, change, type, name, props }) => {

  const inputStyle = {
    width: width ? `${width}vw` : '90px',
    height: height ? `${height}vw` : '76px',
  };

  return (
    <div className='flex flex-col items-center mt-10 lg:mt-0'>
      <label
        className='text-[#FBFBFB] text-[15px] text-left mb-2 mr-56'>
        {text}
      </label>
      <div className='relative'>
        <input
          type={type}
          name={name}
          style={inputStyle}
          className={`rounded-[15px] mb-4 bg-[#EDEDED] max-w-[350px] 
            lg:max-w-[350px] min-h-[50px] max-h-[52px] text-[#7E7E7E]
            font-semibold text-center ${value ? 'text-black' : ''}`}
          value={value}
          onChange={change}
          placeholder={placeholder}
          {props}
        />
      </div>
    </div>
  );
}

export default InputBtn;
