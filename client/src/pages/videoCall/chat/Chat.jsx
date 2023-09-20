import React from 'react'
import { closeBtn } from '../../../constants/icons'
import { ChatNav, Message, MsgInput } from '../../../components'

const Chat = () => {
    return (
        <div>
            <div className='fixed  bottom-0 right-0 lg:h-[41vw] rounded-tl-[45px]
                  lg:w-[26.7vw] bg-[#2B2B2BA6]'>
                <img
                    src={closeBtn}
                    alt="close"
                    className='absolute -top-4 -right-3 p-3 w-[85px]'
                />
                <div className='top-14 flex justify-center items-center'>
                    <ChatNav />
                </div>
                <Message />
                <div className="flex justify-center items-center">
                <MsgInput />
                </div>
            </div>
        </div>
    )
}

export default Chat