import React from 'react';

const AuthenicationBtn = ({ value, logo }) => {

  return (
    <div>
      <button className='flex items-center justify-center pl-11 bg-[#FFFFFF] 
        w-[300px] h-[50px] text-[#1D201B] text-[15px] font-bold mt-4 rounded-[10px] text-center'>
        <img src={logo} alt="" className='w-[60px] flex items-center justify-start right-10' />
        {value}
      </button>
    </div>
  );
}

export default AuthenicationBtn;
