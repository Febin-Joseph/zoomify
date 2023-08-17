// THIS CARD IS FOR LEFT SIDE CARD IN SIGNUP SIGNIN JOIN MEETING AND 
// NEW MEETING AND IT IS ONLY AVAILABLE IN md GREATER DEVICES

import React from 'react'
import InputBtn from '../button/InputBtn'

const MainCard = ({ title }) => {
    return (
        <div className='bg-[#1F1D1D] w-[38vw] h-[38vw] min-h-[300px] rounded-[40px]'>
            <p className='text-[#E3E3E3] text-[2.5vw] text-center font-medium mt-4'>
                {title}
            </p>

            <div className='justify-center items-center inset-0 relative'>
                <InputBtn
                    width={500}
                    height={90}
                    placeholder={"birth date"} />
            </div>
        </div>
    )
}

export default MainCard