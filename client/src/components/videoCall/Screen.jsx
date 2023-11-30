import React from 'react';

const Screen = ({ children }) => {

  return (
    <div className='w-48 h-36 md:w-72 md:h-60 relative rounded-[10px] bg-black overflow-hidden'>
      {children}
    </div>
  )
}

export default Screen