import React from "react";
import { BackIcon } from '../../../components';
import Chat from '../chat/Chat';

const Room = () => {
    return (
        <>
            <div className='flex flex-col bg-[#000] min-h-screen max-h-full text-white'>
                <div className='lg:ml-10 lg:mt-4'>
                    <div className='flex mt-3 ml-5 lg:ml-5 lg:mt-0 lg:items-center'>
                        <BackIcon />
                        <p className='text-white mt-2 lg:mt-0 font-medium text-[32px] ml-4 lg:ml-7 tracking-[2px]'>
                            {
                                "Meeting-1"
                            }
                        </p>
                    </div>
                </div>
            </div>
            <Chat />
        </>
    );
}

export default Room;