import React, { useEffect, useState } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { useParams } from 'react-router-dom';

function Room() {
    const appID = 2082591197;
    const server = '5d5080fdb9f7e39b21f87c7498f7c3ab';
    const streamID = new Date().getTime().toString();
    const zg = new ZegoExpressEngine(appID, server);
    const [joined, setJoined] = useState(false);
    const [remoteStreams, setRemoteStreams] = useState([]);

    const { roomid } = useParams(); // Use the useParams hook to get the room ID from the URL
    const roomID = roomid;
    const token = '04AAAAAGUviekAEGdqcjM3Y2ZvemF6enJscjAAoLfombe4lNeRFYS97kwn66OXJ6143CgXtwgAhFscvEDT607vj4IyrXt8GgtdjSyLXBIQBgKiZi/lMlA93zombmV9V706/M0Np7GFzoSpAL8pRUf+EMyyfuKbqonxQHyYNB5lefeQ0OmCyCWsncR0rxpFX8siP+Gw7Q4y64eyPP4AkoUWK57ADdsvdyEaFgpM71ndJjv7BUT4TXIxWkYZwQg='
    const userID = '_' + new Date().getTime().toString();

    useEffect(() => {
        const initializeApp = async () => {
            // Initialize Zego
            try {
                await zg.checkSystemRequirements();
            } catch (error) {
                console.error("Zego initialization failed:", error);
                return;
            }

            // Event handlers
            zg.on("roomStreamUpdate", (roomID, updateType, streamList) => {
                if (updateType === "ADD") {
                    alert(`User with ID ${streamList[0].userID} has joined the room.`);
                    const newRemoteStreams = [...remoteStreams];

                    streamList.forEach((streamInfo) => {
                        const videoElement = document.createElement("video");
                        videoElement.id = streamInfo.streamID;
                        videoElement.autoplay = true;
                        videoElement.playsInline = true;
                        videoElement.muted = false;
                        newRemoteStreams.push(videoElement);

                        // Start playing the stream
                        zg.startPlayingStream(streamInfo.streamID, {
                            audio: true,
                            video: true,
                        })
                            .then((stream) => {
                                videoElement.srcObject = stream;
                            })
                            .catch((error) => {
                                console.error("Failed to start playing the stream:", error);
                            });
                    });

                    setRemoteStreams(newRemoteStreams);
                } else if (updateType === "DELETE" && zg) {
                    streamList.forEach((streamInfo) => {
                        zg.stopPlayingStream(streamInfo.streamID);
                    });
                }
            });

            try {
                await zg.loginRoom(
                    roomID, // Use the room ID from the URL
                    token,
                    {
                        userID,
                        userName: "kishan",
                    },
                    { userUpdate: true }
                );
                setJoined(true);
            } catch (error) {
                console.error("Failed to login to the room:", error);
            }

            try {
                const localStream = await zg.createStream({
                    camera: {
                        audio: true,
                        video: true,
                    },
                });
                const localVideo = document.getElementById("local-video");
                localVideo.srcObject = localStream;

                await zg.startPublishingStream(streamID, localStream);
            } catch (error) {
                console.error("Failed to create or publish the local stream:", error);
            }
        };

        initializeApp();

        // Cleanup when the component unmounts
        return () => {
            if (joined) {
                zg.logoutRoom();
            }
        };
    }, [roomid, zg, remoteStreams]);

    return (
        <div>
            <div>
                <video id="local-video" autoPlay playsInline muted />
            </div>
            <div id="remote-video">
                {remoteStreams.map((remoteStream, index) => (
                    <div key={index}>{remoteStream}</div>
                ))}
            </div>
        </div>
    );
}

export default Room;
