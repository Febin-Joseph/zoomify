import React from 'react';

const Screen = ({ children }) => {

  return (
    <div className='w-[25vw] h-[20vw] relative rounded-[10px]
       bg-black overflow-hidden'>
      {children}
    </div>
  )
}

export default Screen