import React from 'react'

const Message = () => {
  return (
    <div className='absolute'>
      <div className='w-[185px] h-[62px] bg-white rounded-r-[30px] rounded-b-[20px] pl-4 pt-[2px]'>
        <label
          htmlFor="name"
          className='text-[13px] text-[#5C5C5C]'
        >Febin</label>

        <label
          htmlFor="Date"
          className='text-[11.5px] pl-16 text-[#5C5C5C]'
        >2:03 PM</label>

        <p className='text-[13px] mt-1 text-black font-semibold'>What About The Project</p>
      </div>
    </div>
  )
}

export default Message