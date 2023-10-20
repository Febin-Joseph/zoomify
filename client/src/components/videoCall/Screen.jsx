import React from 'react'

const Screen = ({ children }) => {
  return (
    <div className='flex justify-start items-center ml-[90px]'>
      <div className='w-[62vw] h-[40vw] relative rounded-[30px]
       bg-black min-w-[300px] min-h-[400px] overflow-hidden'>
        {children}
      </div>
    </div>
  )
}

export default Screen