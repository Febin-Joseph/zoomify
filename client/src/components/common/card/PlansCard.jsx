import React from 'react'
import MainBtn from '../button/MainBtn'
import { tickMark } from '../../../constants/icons'

const PlansCard = ({ ...props }) => {
  return (
    <div className='bg-[#262626] w-[320px] h-[450px] rounded-[20px]'>
      <div className='text-[#E3E3E3] text-center mt-5'>
        <p className={`font-medium text-[35px]  font-poppins ${props.color}`}>
          {props.heading}
        </p>
        <p className='text-[20px] mt-2'>{props.price}</p>
        <ul className='mt-8'>
          {props.features.map((feature, index) => (
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
      <div className=''>
        <MainBtn
          value={'Select'}
          height={53}
          width={''}
          onClick={''}
          maxWidth={''}
          type />
      </div>
    </div>
  )
}

export default PlansCard