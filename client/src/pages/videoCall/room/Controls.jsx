import React, { useState } from 'react';
import { PiVideoCameraSlashFill, PiVideoCameraFill } from "react-icons/pi";
import { MdOutlineScreenShare } from "react-icons/md";
import { BiSolidMicrophoneOff } from "react-icons/bi";
import { TiMicrophone } from "react-icons/ti";
import { createClient } from 'agora-rtc-react';
import { MdCallEnd } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCloseChat } from '../../../redux/videoCall/chatSlice';

const Controls = ({ tracks, setInCall }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { closeChat } = useSelector((state) => state.chat);

    const config = {
        mode: 'rtc',
        codec: 'vp8',
    };

    const useClient = createClient(config);
    const client = useClient();
    const [trackState, setTrackState] = useState({ video: true, audio: true });

    const toggleMute = async (type) => {
        if (type === 'audio') {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((prevState) => ({ ...prevState, audio: !prevState.audio }));
        } else if (type === 'video') {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((prevState) => ({ ...prevState, video: !prevState.video }));
        }
    };

    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setInCall(false);
        navigate('/join');
    };

    return (
        <div className='flex align-middle justify-center join'>
            <button onClick={() => toggleMute('audio')} className='flex items-center justify-center join-item btn'>
                {trackState.audio ? (
                    <TiMicrophone size={40} />
                ) : (
                    <BiSolidMicrophoneOff size={40} />
                )}
            </button>

            <button onClick={() => toggleMute('video')} className='flex items-center justify-center join-item btn'>
                {trackState.video ? (
                    <PiVideoCameraFill size={40} />
                ) : (
                    <PiVideoCameraSlashFill size={40} />
                )}
            </button>

            <button onClick={() => ''} className='flex items-center justify-center join-item btn'>
                    <MdOutlineScreenShare size={40} />
            </button>

            <button onClick={() => dispatch(setCloseChat(true))} className='flex items-center justify-center join-item btn'>
                <IoIosSend size={40} />
            </button>

            <button
                className='flex items-center justify-center join-item btn bg-red-600'
                onClick={leaveChannel}>
                <MdCallEnd size={40} />
            </button>
        </div>
    );
};

export default Controls;
