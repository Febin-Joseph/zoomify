import React from 'react';
import { Nav } from '../../components';
import { MainCard } from '../../components';
import { InputBtn } from '../../components';
import { HomeBtn } from '../../components';

const SignUp = () => {
  // function ageVerifiction() {
  //   if(!InputBtn.value === Number) {
  //     alert('enter a valid date of birth')
  //   }
  // }
  return (
    <div className='flex flex-col bg-[#000] h-screen'>
      <Nav value={"Sign Up"} />
      <div
        className='hidden lg:flex lg:items-center lg:justify-center
       lg:w-[50%] lg:bg-[#2B2B2B] lg:flex-grow lg:pt-7'>

        <MainCard title={"Sign Up"}
          renderInputBtn={() => (
            //This input is for showing in the left side in lg greater devices
            <InputBtn
              text={"VERIFY YOUR AGE"}
              width={85}
              height={8}
              placeholder={"Birth Date"}
            />
          )} />
      </div>

      {/* This is for lg less than devices input box */}
      <div className='justify-center items-center lg:hidden'>
        <InputBtn
          text={"VERIFY YOUR AGE"}
          width={85}
          height={8}
          placeholder={"Birth Date"}
        />
      </div>

      <p
        className='text-[#A1A1A1] text-[13px] text-center mt-2'>
        Please confirm Your Birth Year. This data will not be stored.
      </p>

      <div className='mt-5'>
        <HomeBtn 
        value={"Continue"} 
        width={60} 
        height={60}/>
      </div>
    </div>
  );
}

export default SignUp;