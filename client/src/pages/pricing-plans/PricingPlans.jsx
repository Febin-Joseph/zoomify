import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Nav, PlansCard } from '../../components';

const PricingPlans = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/plans', { withCredentials: true }).then((response) => {
            setPlans(response.data);
        });
    }, []);

    return (
        <div className='flex flex-col bg-[#000] min-h-screen max-h-full'>
            <Nav value={"Pricing And Plans"} />

            <div className='flex mt-6 ml-[100px]'>
                <p className='text-white text-[37px]'>Pricing And Plans</p>
            </div>

            <div className='flex items-center justify-center w-[100%] flex-grow
             mt-2 rounded-t-[60px] lg:bg-[#161616] pt-7'>
                <div className='grid grid-cols-1 gap-10 pb-10 md:grid-cols-2 lg:grid-cols-3 lg:space-y-0 lg:flex-row lg:pb-3'>
                    {plans.map((plan) => (
                        <PlansCard
                            key={plan.name}
                            plan={plan}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PricingPlans