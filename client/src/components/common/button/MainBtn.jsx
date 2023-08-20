import React from 'react';

const MainBtn = ({ value, height, width, onClick, maxWidth }) => {

  const buttonStyle = {
    width: width ? `${width}%` : '90px',
    height: height ? `${height}px` : '76px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}
      className='text-[#E3E3E3] text-[21px] font-semibold'>
      <button
        style={buttonStyle}
        className={`rounded-[43px] bg-[#1A6093] flex items-center 
        justify-center content-center m-[5px] ${maxWidth}`}
        onClick={onClick}>
        {value}
      </button>
    </div>
  );
}

export default MainBtn;