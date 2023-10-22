import React, { useState, useEffect } from 'react'
import { AgoraVideoPlayer } from 'agora-rtc-react';

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

export default RemoteVideoTracksView