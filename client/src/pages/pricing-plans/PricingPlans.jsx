import React from 'react'
import { Nav, PlansCard } from '../../components'

const PricingPlans = () => {
    return (
        <div className='flex flex-col bg-[#000] min-h-screen max-h-full'>
            <Nav value={"Pricing And Plans"} />

            <div className='flex mt-6 ml-[100px]'>
                <p className='text-white text-[37px]'>Pricing And Plans</p>
            </div>

            <div className='flex items-center justify-center w-[100%] flex-grow
             mt-2 rounded-t-[60px] lg:bg-[#161616] pt-7'>
                <div className='grid grid-cols-1 gap-10 pb-10 md:grid-cols-2
                lg:grid-cols-3 lg:space-y-0 lg:flex-row lg:pb-3'>
                    <PlansCard
                        heading={'Basic Plan'}
                        price={'$2.99 /Month'}
                        color={'text-gradient-basic'}
                        features={['Set ID and Password']}
                    />
                    <PlansCard
                        heading={'Pro Plan'}
                        price={'$5.99 /Month'}
                        color={'text-gradient-pro'}
                        features={['Set ID and Password', 'Find Who Is The Host']}
                    />
                    <PlansCard
                        heading={'Premium  Plan'}
                        price={'$20.99 /Month'}
                        color={'text-gradient-premium'}
                        features={['Set ID and Password', 'Find Who Is The Host', 'Schedule Meeting', 'Video View']}
                    />
                </div>
            </div>
        </div>
    )
}

export default PricingPlans