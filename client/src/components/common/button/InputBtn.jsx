import React from 'react'

const InputBtn = ({ text, width, height, placeholder }) => {

  const buttonStyle = {
    width: width ? `${width}vw` : '90px',
    height: height ? `${height}vw` : '76px',
  }
  return (
    <div className='flex justify-center'>
      <div className='w-[100%] absolute'>
        <p className='text-[#FBFBFB] text-[15px] justify-center text-center'>{text}</p>
      </div>
      <button
        style={buttonStyle}
        className='rounded-[20px] bg-[#EDEDED] max-w-[380px]
          lg:max-w-[35vw] min-h-[7vh] max-h-[65px] mt-20 text-[#7E7E7E]
           font-semibold text-center'>
        {placeholder}
      </button>
    </div>
  )
}

export default InputBtn