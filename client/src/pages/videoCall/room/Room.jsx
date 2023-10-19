import React, { useEffect, useState } from "react";
import {
  createClient,
  createMicrophoneAndCameraTracks,
  AgoraVideoPlayer,
} from "agora-rtc-react";

const config = {
  mode: "rtc",
  codec: "vp8",
};

const useClient = createClient(config);
const useMicrophoneAndCamera = createMicrophoneAndCameraTracks();

const Room = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("123");
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCamera();

  useEffect(() => {
    const init = async (name) => {
      await client.join(
        "7457a70d4d864646b16e8fc3f75413ff",
        name,
        "007eJxTYLg5c2q3x+YtLpaPylKMNnFu0xJlOcIenO4QPGnZC/7Y4ikKDOYmpuaJ5gYpJikWZiZAmGRolmqRlmycZm5qYmiclnb5gEFqQyAjw+tbl1gZGSAQxGdmMDQyZmAAAMQXHcY=",
        null
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
          <LocalVideoTrackView tracks={tracks} />
          <RemoteVideoTracksView client={client} />
          <Controls tracks={tracks} setInCall={setInCall} />
        </div>
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  );
};

const LocalVideoTrackView = ({ tracks }) => {
  return (
    <div>
      <h2>Your Video</h2>
      <AgoraVideoPlayer
        videoTrack={tracks[1]}
        style={{ width: "320px", height: "240px" }}
      />
    </div>
  );
};

const RemoteVideoTracksView = ({ client }) => {
  const [remoteUsers, setRemoteUsers] = useState([]);

  useEffect(() => {
    const subscribeToRemoteUser = async (user) => {
      await client.subscribe(user, "video");
      setRemoteUsers((prevUsers) => [...prevUsers, user]);
    };

    const unsubscribeFromRemoteUser = (user) => {
      setRemoteUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser.uid !== user.uid)
      );
    };

    // Subscribe to existing remote users' video tracks
    client.remoteUsers.forEach(subscribeToRemoteUser);

    // Event listener for when a new user publishes their video
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video") {
        subscribeToRemoteUser(user);
      }
      if (mediaType === "audio") {
        user.audioTrack?.play();
      }
    });

    // Event listener for when a user unpublishes their video
    client.on("user-unpublished", (user) => {
      unsubscribeFromRemoteUser(user);
    });

    // Event listener for when a user leaves the channel
    client.on("user-left", (user) => {
      // Remove the user's video from the view
      unsubscribeFromRemoteUser(user);
    });

    return () => {
      client.removeAllListeners();
    };
  }, [client]);

  return (
    <div>
      <h2>Remote Participants</h2>
      {remoteUsers.map((user) => (
        <AgoraVideoPlayer
          key={user.uid}
          videoTrack={user.videoTrack}
          style={{ width: "320px", height: "240px" }}
        />
      ))}
    </div>
  );
};

const Controls = ({ tracks, setInCall }) => {
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
    <div>
      <button onClick={() => toggleMute("audio")}>
        {trackState.audio ? "Mute Audio" : "Unmute Audio"}
      </button>
      <button onClick={() => toggleMute("video")}>
        {trackState.video ? "Mute Video" : "Unmute Video"}
      </button>
      <button onClick={leaveChannel}>Leave</button>
    </div>
  );
};

const ChannelForm = ({ setInCall, setChannelName }) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={() => setInCall(true)}>Join</button>
    </form>
  );
};

export default Room;