import React from 'react'

const Home2btn = ({ ...props }) => {
  return (
    <button
      onClick={props.click}>
      <div className={`w-[95px] h-[85px] rounded-[20px] ${props.color} flex items-center
          justify-center mt-[-20px]`}>
        <div className='bg-white w-[65px] h-[60px] items-center justify-center rounded-[15px]'>
          <img
            src={props.icon}
            alt="joinBtn"
            className='items-center justify-center m-auto pt-3 w-[45px]' />
        </div>
      </div>
      <p className='text-white text-[18px] text-center'>{props.value}</p>
    </button>
  )
}

export default Home2btn