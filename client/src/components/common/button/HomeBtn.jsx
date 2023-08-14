import React from 'react';

const HomeBtn = ({ value, height, width }) => {
  const buttonStyle = {
    width: width ? `${width}%` : '90px', // Set the width in pixels directly
    height: height ? `${height}px` : '76px',
    borderRadius: '43px',
    backgroundColor: '#1A6093',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}
    className='text-[#E3E3E3] text-[21px] font-semibold'>
      <button style={buttonStyle}>{value}</button>
    </div>
  );
}

export default HomeBtn;
