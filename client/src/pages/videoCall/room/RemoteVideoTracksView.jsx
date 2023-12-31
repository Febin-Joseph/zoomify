import React, { useState, useEffect } from 'react'
import { AgoraVideoPlayer } from 'agora-rtc-react';
import { Screen } from '../../../components';

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
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {remoteUsers.map((user) => (
        <Screen key={user.uid}>
          <AgoraVideoPlayer
            videoTrack={user.videoTrack}
            style={{ height: '100%', width: '100%' }}
          />
        </Screen>
      ))}
    </div>
  );
};

export default RemoteVideoTracksView