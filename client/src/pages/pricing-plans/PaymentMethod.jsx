import React, { useState } from 'react'

const PaymentMethod = () => {
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(true);

  const handleCancel = () => {
    setIsPaymentEnabled(false);
  };

  return (
    <div>
      {isPaymentEnabled && (
        <div className='text-white paymentCard w-[400px] md:w-[430px] h-[340px] rounded-[15px]'>
          <p className='flex justify-center items-center text-[25px] font-bold pt-5 md:text-[28px]'>
            Select Your Payment Method
          </p>
          <div>
            {/* <input type="radio" /> */}
            <div className='text-black flex flex-col font-bold text-[20px] mt-4'>
              <button className='paymentBtn h-[60px] mb-1'>Stripe</button>
              <button className='paymentBtn text-center h-[60px] mb-1'>PayPal</button>
              <button className='paymentBtn text-center h-[60px] mb-1'>Razorpay</button>
            </div>
            <div className='mt-3 space-x-6 text-white font-bold text-center'>
              <button
                className='bg-[#1A6093] w-[115px] h-[45px] rounded-[13px]'
                onClick={''}>
                Select
              </button>
              <button
                className='bg-[#DE5247] w-[115px] h-[45px] rounded-[13px]'
                onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentMethod