import React from 'react'
import { AgoraVideoPlayer } from 'agora-rtc-react';
import { Screen } from '../../../components';

const LocalVideoTrackView = ({ tracks }) => {
    return (
        <div>
            <Screen>
                <AgoraVideoPlayer
                    videoTrack={tracks[1]}
                    style={{ height: "100%", width: "100%" }}
                />
            </Screen>
        </div>
    );
};

export default LocalVideoTrackView