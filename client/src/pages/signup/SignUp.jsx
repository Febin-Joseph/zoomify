import React from 'react';
import { Nav } from '../../components';
import { MainCard } from '../../components';
import { InputBtn } from '../../components';

const SignUp = () => {
  return (
    <div className='flex flex-col bg-[#000] h-screen'>
      <Nav value={"Sign Up"} />
      <div className='hidden lg:flex lg:items-center lg:justify-center
       lg:w-[50%] lg:bg-[#2B2B2B] lg:flex-grow lg:pt-7'>
        <MainCard title={"Sign Up"} />
      </div>

      <div className='justify-center items-center '>
        <InputBtn
          text={"VERIFY YOUR AGE"}
          width={85}
          height={8}
          placeholder={"Birth Date"} />
      </div>
    </div>
  );
}

export default SignUp;
