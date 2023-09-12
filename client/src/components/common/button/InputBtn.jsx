import React, { useState } from 'react';
import { copy, lock } from '../../../constants/icons';

const InputBtn = ({ ...props }) => {

  const [isHovered, setIsHovered] = useState(false);

  const inputStyle = {
    width: props.width ? `${props.width}vw` : '90px',
    height: props.height ? `${props.height}vw` : '76px',
  };


  return (
    <div className='flex flex-col items-center mt-10 lg:mt-0'>
      <label className='text-[#FBFBFB] text-[15px] text-left mb-2 mr-56'>
        {props.text}
      </label>
      <div
        className='relative'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input
          type={props.type}
          name={props.name}
          style={inputStyle}
          className={`rounded-[15px] mb-4 bg-[#EDEDED] max-w-[350px] 
            lg:max-w-[350px] min-h-[50px] max-h-[52px] text-[#7E7E7E]
            font-semibold text-center ${props.value ? 'text-black' : ''}`}
          value={props.value}
          onChange={props.change}
          placeholder={props.placeholder}
          inputMode={props.inputMode}
        />
        {isHovered && props.showCopyIcon && (
          <div className='absolute top-2.5 right-2 space-x-2 flex items-center 
            justify-center opacity-100 transition-opacity duration-300 ease-in-out'>
            <img
              src={copy}
              alt="Copy"
              className='w-[30px]' />
            <img
              src={lock}
              alt="lock"
              className='w-[30px]' />
          </div>
        )}
      </div>
    </div>
  );
}

export default InputBtn;
