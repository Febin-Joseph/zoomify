import React, { useState } from 'react';
import { copy, goBtn2, lock } from '../../../constants/icons';
import { useNavigate } from 'react-router-dom';

const InputBtn = ({ ...props }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [payMsg, setPayMsg] = useState(false)

  const navigate = useNavigate();

  const inputStyle = {
    width: props.width ? `${props.width}vw` : '90px',
    height: props.height ? `${props.height}vw` : '76px',
  };

  const handleClickLock = () => {
    setPayMsg(true);
  }

  // Hiding the PayMsg when mouse leaves
  const handleMouseLeave = () => {
    setPayMsg(false);
  }

  const handleMeetingIdCopy = () => {
    navigator.clipboard.writeText(props.value)
    alert("copied")
  }

  const handleMeetingPswdCopy = () => {
    navigator.clipboard.writeText(props.pswd)
    alert("copied")
  }

  return (
    <div className='flex flex-col items-center mt-10 lg:mt-0'>
      <label className='text-[#FBFBFB] text-[15px] text-left mb-2 mr-56'>
        {props.text}
      </label>
      <div
        className='relative'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
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
          disabled={props.disabled}
        />
        {isHovered && props.showCopyIcon && (
          <div className='absolute top-2.5 right-2 space-x-2 flex items-center 
            justify-center opacity-100 transition-opacity duration-300 ease-in-out'>
            <img
              src={copy}
              alt="Copy"
              className='w-[30px]'
              onClick={handleMeetingIdCopy}
            />
            <img
              src={lock}
              alt="lock"
              className='w-[30px]'
              onClick={handleClickLock}
            />

            {/* Displaying Paying Notification  */}
            {payMsg && (
              <div
                className="w-[230px] rounded-[30px] bg-[#515977] p-2 absolute bottom-[43px] -right-3 flex"
                onClick={() => navigate('/plans')}
              >
                <p className='text-start text-[12px] text-white w-40 ml-3'>
                  PAY FOR UNLOCK SETTING ID AND PASSWORD
                </p>
                <img
                  src={goBtn2}
                  alt="goBtn"
                  className='ml-2'
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputBtn;