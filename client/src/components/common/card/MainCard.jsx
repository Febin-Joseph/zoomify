// THIS CARD IS FOR LEFT SIDE CARD IN SIGNUP SIGNIN JOIN MEETING AND 
// NEW MEETING AND IT IS ONLY AVAILABLE IN md GREATER DEVICES

import React from 'react';

const MainCard = ({ title, children }) => {
    return (
        <div className='bg-[#1F1D1D] w-[38vw] max-w-[480px] h-[38vw] min-h-[300px]
         max-h-[450px] rounded-[40px]'
        >
            <p className='text-[#E3E3E3] text-[2.5vw] text-center font-medium 
            mt-5 mb-12'
            >
                {title}
            </p>
            {children}
        </div>
    );
}

export default MainCard;
