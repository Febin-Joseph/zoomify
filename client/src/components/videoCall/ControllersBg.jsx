import React from 'react'

const ControllersBg = ({ ...props }) => {
    return (
        <div className='bg-[#5F5F5F] btn btn-circle w-[60px] h-[60px] md:w-[75px] md:h-[75px]'>
            <div className='justify-center flex items-center pt-[10px]'>
                <img
                    src={props.img}
                    alt={props.alt}
                    className={props.style} />
            </div>
        </div>
    )
}

export default ControllersBg