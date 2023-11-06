import React from 'react';

const Screen = ({ children, remoteUsers }) => {

  return (
    <div className={`flex justify-start items-center ml-[90px]`}>
      <div className='w-[25vw] h-[20vw] relative rounded-[10px]
       bg-black overflow-hidden'>
        {children}
      </div>
    </div>
  )
}

export default Screen