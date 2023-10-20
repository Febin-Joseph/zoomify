import React, { useState } from 'react'
import { createClient } from 'agora-rtc-react';
import { ControllersBg } from '../../../components';
import { endCall, mute, share, unmute, videoOff, videoOn } from '../../../constants/icons';

const Controls = ({ tracks, setInCall }) => {
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
    };

    return (
        <div className='flex align-middle justify-center'>
            <button onClick={() => toggleMute("audio")} className="flex items-center justify-center">
                {trackState.audio ? (
                    <ControllersBg
                        img={unmute}
                        alt="muteMic"
                        style="w-[50px] h-[55px]"
                    />
                ) : (
                    <ControllersBg
                        img={mute}
                        alt="unMuteMic"
                        style="w-[50px] h-[55px]"
                    />
                )}
            </button>

            <button onClick={() => toggleMute("video")} className="flex items-center justify-center">
                {trackState.video ? (
                    <ControllersBg
                        img={videoOn}
                        alt="turn off video"
                        style="w-[50px] h-[55px]"
                    />
                ) : (
                    <ControllersBg
                        img={videoOff}
                        alt="turn on video"
                        style="w-[50px] h-[55px]"
                    />
                )}
            </button>

            <button onClick={() => ""} className="flex items-center justify-center">
                <ControllersBg
                    img={share}
                    alt="share screen"
                    style="w-[40px] h-[55px]"
                />
            </button>

            <button className='bg-[#DE5247] w-[125px] h-[70px] rounded-[45px] flex items-center justify-center' onClick={leaveChannel}>
                <img
                    src={endCall}
                    alt="leave meeting"
                />
            </button>
        </div>
    );
};

export default Controls