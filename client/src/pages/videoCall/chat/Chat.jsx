import React from 'react'
import { closeBtn } from '../../../constants/icons'

const Chat = () => {
    return (
        <div className=''>
            <div className='fixed bottom-0 right-0 lg:h-[41vw] rounded-tl-[45px]
       lg:w-[26.7vw] bg-[#2B2B2BA6]'>
                <img
                    src={closeBtn}
                    alt="close"
                    className='absolute -top-4 -right-3 p-3'
                />
            </div>
        </div>
    )
}

export default Chat