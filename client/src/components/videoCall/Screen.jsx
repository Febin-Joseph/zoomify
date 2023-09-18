import React from 'react'

const Screen = ({ children }) => {
  return (
    <div className='flex justify-start items-center ml-[90px]'>
      <div className='w-[63vw] h-[40vw] relative rounded-[45px] bg-white min-w-[300px] min-h-[400px]'>
        {children}
      </div>
    </div>
  )
}

export default Screen