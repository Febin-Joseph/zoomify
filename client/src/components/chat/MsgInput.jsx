import React from 'react';
import { send } from '../../constants/icons';

const MsgInput = ({ value, onChange, onSend }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSend();
        }
    };

    return (
        <div className='absolute bottom-0 mb-3'>
            <div className='flex relative'>
                <input
                    placeholder='Type message here......'
                    className='w-[300px] min-h-[55px] bg-white rounded-[18px] pl-5 pr-14 resize-none'
                    value={value}
                    onChange={onChange}
                    onKeyPress={handleKeyPress}
                />
                <div
                    className='bg-black w-12 h-12 rounded-[50%] absolute right-1 top-0 bottom-0 m-auto flex items-center justify-center'
                    onClick={onSend}
                >
                    <img src={send} alt="send Msg" className='w-[25px]' />
                </div>
            </div>
        </div>
    );
};

export default MsgInput;
