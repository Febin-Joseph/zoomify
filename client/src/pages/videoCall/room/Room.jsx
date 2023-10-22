import React, { useEffect, useState } from "react";
import {
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

import { useParams } from "react-router-dom";
import Chat from "../chat/Chat";
import { BackIcon } from "../../../components";
import { LocalVideoTrackView, RemoteVideoTracksView, Controls } from "../../../pages";
import axios from "axios";

const config = {
  mode: "rtc",
  codec: "vp8",
};

const useClient = createClient(config);
const useMicrophoneAndCamera = createMicrophoneAndCameraTracks();

const Room = () => {
  const { roomid, uid } = useParams();
  const meetingName = roomid
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState(meetingName);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCamera();

  const fetchToken = async (channelName, uid, role, expireTime) => {
    const tokenURL = `https://zoomify-backend.onrender.com/agora/token-gen/${channelName}/${uid}/${role}/${expireTime}`;
    try {
      const response = await axios.get(tokenURL);

      if (response.status === 200) {
        const data = response.data;
        return data.token;
      } else {
        console.error('Failed to fetch Agora token:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching Agora token:', error);
      return null;
    }
  };


  useEffect(() => {
    const init = async (channelName) => {
      const agoraToken = await fetchToken(channelName, uid, "publisher");
      const saveUid = localStorage.setItem("_userUID", uid)
      const saveToken = localStorage.setItem("_agora_token", agoraToken)

      if (!agoraToken) {
        console.error("Failed to fetch Agora token");
        return;
      }

      await client.join(
        "7457a70d4d864646b16e8fc3f75413ff",
        channelName,
        agoraToken,
        uid,
      );

      if (ready && tracks && tracks.length >= 2) {
        await client.publish([tracks[0], tracks[1]]);
        setInCall(true);
      }
    };

    if (ready) {
      init(channelName);
    }

    return async () => {
      await client.leave();
      if (tracks) {
        tracks[0] && tracks[0].close();
        tracks[1] && tracks[1].close();
      }
    };
  }, [channelName, client, ready, tracks]);

  return (
    <div>
      {inCall ? (
        <div>
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
            <LocalVideoTrackView tracks={tracks} />
            <RemoteVideoTracksView client={client} />
            <Controls tracks={tracks} setInCall={setInCall} />
          </div>
        </div>
      ) : (
        <div>

        </div>
      )}

      <Chat />
    </div>
  );
};

export default Room;
