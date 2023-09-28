import React, { useState } from 'react';
import MainBtn from '../button/MainBtn';
import { tickMark } from '../../../constants/icons';
import { PaymentMethod } from '../../../pages';

const PlansCard = ({ plan }) => {
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  let textGradientClass;
  switch (plan.name) {
    case 'Basic Plan':
      textGradientClass = 'text-gradient-basic';
      break;
    case 'Pro Plan':
      textGradientClass = 'text-gradient-pro';
      break;
    case 'Premium Plan':
      textGradientClass = 'text-gradient-premium';
      break;
    default:
      textGradientClass = 'text-gradient-premium';
  }

  const handleSelect = () => {
    setShowPaymentMethods(true);
  };

  const handleClosePaymentMethods = () => {
    setShowPaymentMethods(false);
  };

  const handleSelectPaymentMethod = (method) => {
    
    console.log(`Selected payment method: ${method}`);
    setShowPaymentMethods(false);
  };

  return (
    <div className='bg-[#262626] w-[320px] h-[450px] rounded-[20px] flex flex-col'>
      <div className='text-[#E3E3E3] text-center mt-5 flex-grow'>
        <p className={`font-medium text-[35px] font-poppins ${textGradientClass}`}>
          {plan.name}
        </p>
        <p className='text-[20px] mt-2'>{plan.price / 100}</p>
        <ul className='mt-8'>
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center mt-4 space-x-4">
              <span>
                <img
                  src={tickMark}
                  alt="tickMark"
                  className='ml-8'
                />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='mb-20'>
        <MainBtn
          value={'Select'}
          height={53}
          width={''}
          onClick={handleSelect}
          maxWidth={''}
        />
      </div>
      {showPaymentMethods && (
        <PaymentMethod
          onClose={handleClosePaymentMethods}
          onSelectPaymentMethod={handleSelectPaymentMethod}
        />
      )}
    </div>
  );
};

export default PlansCard;
