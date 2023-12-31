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
import { useSocket } from "../../../utils/SocketProvider";

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
  const [users, setUsers] = useState([]);

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCamera();
  const socket = useSocket();

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

      socket.emit("join-meeting", (user) => {
        const data = {
          ...user,
          customData: {
            name: users
          }
        }
        console.log(data)
        setUsers((prevUsers) => [...prevUsers, data]);
      });
      
      socket.emit("join-meeting", (newUser) => {
        setUsers(newUser);
        console.log("username", newUser)
      });

      client.on("token-privilege-will-expire", async function () {
        let token = await fetchToken(channelName, uid, "publisher");
        await client.renewToken(token);
      });

      client.on("token-privilege-did-expire", async function () {
        console.log("Fetching the new Token")
        let token = await fetchToken(channelName, uid, "publisher");
        console.log("Rejoining the channel with new Token")
        await client.join(
          "7457a70d4d864646b16e8fc3f75413ff",
          channelName,
          agoraToken,
          uid,
        );
      });
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
          <div className='flex flex-col bg-[#333333] min-h-screen max-h-full text-white'>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 ml-[90px] mt-3">
              <LocalVideoTrackView tracks={tracks} />
              <RemoteVideoTracksView client={client} />
            </div>
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
              <Controls
                tracks={tracks}
                setInCall={setInCall}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>

        </div>
      )}

      <Chat users={users} />
    </div>
  );
};

export default Room;