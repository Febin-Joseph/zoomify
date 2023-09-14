import React from 'react'
import { BackIcon, Screen } from '../../../components';
import Chat from '../chat/Chat';

const Room = ({ nameValidation }) => {
    return (
        <div className='flex flex-col bg-[#000] min-h-screen max-h-full'>
            <div className='lg:ml-10 lg:mt-4'>
                <div className='ml-5 mt-0 flex items-center'>
                    <BackIcon />
                    <p className='text-white font-medium text-[35px] ml-4 lg:ml-7 tracking-[2px]'>
                        {
                            nameValidation ?
                                nameValidation
                                : "Meeting-1"
                        }
                    </p>
                </div>
                <div className='mt-4 '>
                    <Screen />
                </div>
                    <Chat />
            </div>
        </div>
    )
}

export default Room;