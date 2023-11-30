import React, { useState } from 'react'
import { createClient } from 'agora-rtc-react';
import { ControllersBg } from '../../../components';
import { endCall, mute, share, unmute, videoOff, videoOn } from '../../../constants/icons';
import { useNavigate } from 'react-router-dom';

const Controls = ({ tracks, setInCall }) => {

    const navigate = useNavigate();

    const config = {
        mode: "rtc",
        codec: "vp8",
    };

    const useClient = createClient(config);

    const client = useClient();
    const [trackState, setTrackState] = useState({ video: true, audio: true });

    const toggleMute = async (type) => {
        if (type === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((prevState) => ({ ...prevState, audio: !prevState.audio }));
        } else if (type === "video") {
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
        navigate('/join')
    };

    return (
        <div className='flex align-middle justify-center space-x-2'>
            <button onClick={() => toggleMute("audio")} className="flex items-center justify-center">
                {trackState.audio ? (
                    <ControllersBg
                        img={unmute}
                        alt="muteMic"
                        style="w-[40px] h-[45px] md:w-[50px] md:h-[55px]"
                    />
                ) : (
                    <ControllersBg
                        img={mute}
                        alt="unMuteMic"
                        style="w-[40px] h-[45px] md:w-[50px] md:h-[55px]"
                    />
                )}
            </button>

            <button onClick={() => toggleMute("video")} className="flex items-center justify-center">
                {trackState.video ? (
                    <ControllersBg
                        img={videoOn}
                        alt="turn off video"
                        style="w-[40px] h-[45px] md:w-[50px] md:h-[55px]"
                    />
                ) : (
                    <ControllersBg
                        img={videoOff}
                        alt="turn on video"
                        style="w-[40px] h-[45px] md:w-[50px] md:h-[55px]"
                    />
                )}
            </button>

            <button onClick={() => ""} className="flex items-center justify-center">
                <ControllersBg
                    img={share}
                    alt="share screen"
                    style="w-[30px] h-[35px] md:w-[40px] md:h-[45px]"
                />
            </button>
            <button
                className='bg-[#DE5247] flex items-center justify-center w-[100px] h-[65px] rounded-[40px] md:w-[125px] md:h-[70px] md:rounded-[45px]'
                onClick={leaveChannel}>
                <img
                    src={endCall}
                    alt="leave meeting"
                />
            </button>
        </div>
    );
};

export default Controls