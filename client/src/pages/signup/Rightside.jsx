import React from 'react'
import { InputBtn, MainBtn, AuthenicationBtn } from '../../components'

const Rightside = ({ value1, logo1, value2, logo2 }) => {
  return (
    <div>
      <InputBtn
        text={"ENTER YOUR EMAIL"}
        width={85}
        height={8}
        placeholder={"Email"}
        change={''}
        value={''}
      />

      <InputBtn
        text={"ENTER YOUR PASSWORD"}
        type={"Password"}
        width={85}
        height={8}
        placeholder={"Password"}
        change={''}
        value={''}
      />

      <div className='flex items-center justify-center'>
        <p className='text-[#A1A1A1] text-[13px] lg:w-[25vw] w-[250px] text-center mt-1 mb-3'>
          By proceeding, I agree to the Zoomify’s Privacy Statement and Terms of Service.
        </p>
      </div>

      <div className='mb-8'>
        <MainBtn
          value={"Continue"}
          width={60}
          height={60}
          maxWidth={"max-w-[300px]"}
        />
      </div>

      <div className=' items-center justify-center flex flex-col'>
        <p className='text-[#A1A1A1] text-[12px] text-center mt-3 absolute'>
          OR SELECT YOUR {value1.includes("Sign Up") ? "SIGN UP" : "SIGN IN"} METHOD
          <span className='absolute mt-2 w-full flex items-center  h-[0.5px] bg-[#FFFFFF]'></span>
        </p>
      </div>
      <div className='mt-7 flex items-center justify-center flex-col'>
        <AuthenicationBtn
          value={value1}
          logo={logo1}
        />

        <AuthenicationBtn
          value={value2}
          logo={logo2}
        />
      </div>
    </div>
  )
}

export default Rightside;