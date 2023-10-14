import React from "react";
import { BackIcon } from '../../../components';
import Chat from '../chat/Chat';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'

const Room = () => {
    let roomID = "123";
    let appID = 2082591197
    // Access server address, which is of the String type. You can obtain it in ZEGOCLOUD Admin Console. (For more information about how to obtain it, see Prerequisites.)
    let server = "5d5080fdb9f7e39b21f87c7498f7c3ab"
    const isLogin =  zg.loginRoom(
        roomID,
        token,
        { userID },
        { userUpdate: true }
      );
    // Instance initialization
    const zg = new ZegoExpressEngine(appID, server);
    zg.setDebugVerbose(false)
    // Room status update callback
    // In the sample code, streams are published immediately after you successfully log in to a room. When implementing your service, you can choose to publish streams at any time when the room is connected status.
    // Room status update callback
    zg.on('roomStateChanged', async (roomID, reason, errorCode, extendedData) => {
        if (reason === 'LOGINED') {
            console.log("Connected to the room successfully. You can perform operations such as stream publishing and playing only after the room is successfully connected.")
        } else if (reason == 'LOGIN_FAILED') {
            console.log("Login failed.")
        } else if (reason == 'RECONNECTING') {
            console.log("Reconnecting.")
        } else if (reason == 'RECONNECTED') {
            console.log("Reconnection successful.")
        } else if (reason == 'RECONNECT_FAILED') {
            console.log("Reconnection failed.")
        } else if (reason == 'KICKOUT') {
            console.log("Forced to log out of a room.")
        } else if (reason == 'LOGOUT') {
            console.log("Logout successful.")
        } else if (reason == 'LOGOUT_FAILED') {
            console.log("Logout failed.")
        }
    });
    let streamID = new Date().getTime().toString();
    // Notification of users joining or leaving a room
    // The `roomUserUpdate` callback can be received only when `ZegoRoomConfig` in which the `userUpdate` parameter is set to `true` is passed in the `loginRoom` method.
    zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
        if (updateType == 'ADD') {
            // A stream is added.
            for (var i = 0; i < streamList.length; i++) {
                console.log('Room',roomID,'has a stream added:', streamList[i]['streamID'])
            }
            const message = "Video stream ID of the user: " + streamID.toString();
        } else if (updateType == 'DELETE') {
            // A stream is deleted.
            for (var i = 0; i < streamList.length; i++) {
                console.log('Room',roomID,'has a stream deleted:', streamList[i]['streamID'])
            }
        }
    });
    zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
        if (updateType == 'ADD') {
            // A stream is added.
            for (var i = 0; i < streamList.length; i++) {
                console.log('Room',roomID,'has a stream added:', streamList[i]['streamID'])
            }
            const message = "Video stream ID of the user: " + streamID.toString();
        } else if (updateType == 'DELETE') {
            // A stream is deleted.
            for (var i = 0; i < streamList.length; i++) {
                console.log('Room',roomID,'has a stream deleted:', streamList[i]['streamID'])
            }
        }
    });
    
    // Notification of users joining or leaving a room
    // The `roomUserUpdate` callback can be received only when `ZegoRoomConfig` in which the `userUpdate` parameter is set to `true` is passed in the `loginRoom` method.
    zg.on('roomUserUpdate', (roomID, updateType, userList) => {
        if (updateType == 'ADD') {
            for (var i = 0; i < userList.length; i++) {
                console.log(userList[i]['userID'], 'joins the room:', roomID)
            }
        } else if (updateType == 'DELETE') {
            for (var i = 0; i < userList.length; i++) {
                console.log(userList[i]['userID'], 'leaves the room:', roomID)
            }
        }
    });
    
    // Status notification of audio and video stream publishing
    // This callback is received when the status of audio and video stream publishing of a user changes. If an exception occurs during stream publishing due to a network interruption, the SDK retries to publish the streams and triggers this status change notification.
    zg.on('publisherStateUpdate', result => {
        // Stream publishing status update callback
        var state = result['state']
        var streamID = result['streamID']
        var errorCode = result['errorCode']
        var extendedData = result['extendedData']
        if (state == 'PUBLISHING') {
            console.log('Successfully published an audio and video stream:', streamID);
        } else if (state == 'NO_PUBLISH') {
            console.log('No audio and video stream published');
        } else if (state == 'PUBLISH_REQUESTING') {
            console.log('Requesting to publish an audio and video stream:', streamID);
        }
        console.log('Error code:', errorCode,' Extra info:', extendedData)
    })
    
    // Quality callback for published streams
    // After successfully publishing streams, you will regularly receive callbacks showing the quality data (such as resolution, frame rate, and bitrate) of audio and video streams.
    zg.on('publishQualityUpdate', (streamID, stats) => {
        // Quality callback for published streams
        console.log('Stream quality callback')
    })
    
    // Status notifications of audio and video stream playing.
    // This callback is received when the status of audio and video stream playing of a user changes. If an exception occurs during stream playing due to a network interruption, the SDK automatically retries to play the streams.
    zg.on('playerStateUpdate', result => {
        // Stream playing status update callback
        var state = result['state']
        var streamID = result['streamID']
        var errorCode = result['errorCode']
        var extendedData = result['extendedData']
        if (state == 'PLAYING') {
            console.log('Successfully played an audio and video stream:', streamID);
        } else if (state == 'NO_PLAY') {
            console.log('No audio and video stream played');
        } else if (state == 'PLAY_REQUESTING') {
            console.log('Requesting to play an audio and video stream:', streamID);
        }
        console.log('Error code:', errorCode,' Extra info:', extendedData)
    })
    
    // Quality callback for audio or video stream playing
    // After successfully playing streams, you will regularly receive the notification of quality data (such as resolution, frame rate, and bitrate) during audio or video stream playing.
    zg.on('playQualityUpdate', (streamID,stats) => {
        // Quality callback for played streams
    })
    
    // Notification of receiving a broadcast message
    zg.on('IMRecvBroadcastMessage', (roomID, chatData) => {
        console.log('Broadcast message defined by using IMRecvBroadcastMessage', roomID, chatData[0].message);
        alert(chatData[0].message)
    });
    
    // Notification of receiving a pop-up message
    zg.on('IMRecvBarrageMessage', (roomID, chatData) => {
        console.log('Pop-up message defined by using IMRecvBroadcastMessage', roomID, chatData[0].message);
        alert(chatData[0].message)
    });
    
    // Notification of receiving a custom signaling message
    zg.on('IMRecvCustomCommand', (roomID, fromUser, command) => {
        console.log('Custom message defined by using IMRecvCustomCommand', roomID, fromUser, command);
        alert(command)
    });

    zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
        // Notification of audio or video stream updates of other users in a room
        if (updateType === 'ADD') {
            
            // When streams are added, play them.
            // In the sample code, the audio and video of the first stream in the stream addition list are played.
            const streamID = streamList[0].streamID;
            // The stream list specified by `streamList` contains the ID of the corresponding stream.
            const remoteStream = await zg.startPlayingStream(streamID);
            // Create a media stream player.
            const remoteView = zg.createRemoteStreamView(remoteStream);
            remoteView.play("remote-video", { enableAutoplayDialog: true });

        } else if (updateType === 'DELETE') {
            // When streams are deleted, stop playing them based on `streamID` of the streams in the stream deletion list specified by `streamList`.
            const streamID = streamList[0].streamID;
            zg.stopPlayingStream(streamID)
        }
    });

    // Log in to a room. If the login succeeds, `true` is returned.
    // The `roomUserUpdate` callback can be received only when `userUpdate` is set to `true`.
    let userID = "user1"; // You can set `userID` based on your service requirements but ensure that it is globally unique.
    let userName = "user12";// You can set `userName` based on your service requirements, which is not necessarily to be unique.
    // You can set `roomID` based on your service requirements but ensure that it is globally unique.
    // The value of `token` is generated by your server. To quickly perform debugging, you can apply for a temporary audio and video token of the String type in ZEGOCLOUD Admin Console (https://console.zego.im/).
    let token = `04AAAAAGUr7uwAEGk2emtxZzdleHhjbHlicTEAoLKF0VvA1wNpo5l1ZpvD13NvHQWRk6cNnnkVt0I5e2WZAGS3K06XBb6b7gG74VX10RTF21fWeJgZOK7mSVouwAuWvLd0S8lCnuifbJyEu54pqwhMYlbi+CoDgHwhoWfpRbZQCEw8dGoDrSxGp+JX7QWTkfxcNoA3K2//gvzgAyrNavRUuNttjy2QEDZ8lXpzSYxSbAnC8a/UcYK8/G1LPB8=`;
    zg.on('roomStateChanged', async (roomID, reason, errorCode, extendedData) => {

    })

    zg.loginRoom(roomID, token, { userID, userName }, { userUpdate: true }).then(async result => {
        if (result === true) {
            console.log("login success");
            // Connected to the room successfully. You can perform operations such as stream publishing and playing only after the room is successfully connected.
            // Create a stream and start the preview.
            // After calling the `createStream` method, you cannot perform subsequent operations until the ZEGOCLOUD server returns a streaming media object.
            const localStream = await zg.createStream();
            // Create a media stream player.
            const localView = zg.createLocalStreamView(localStream);
            localView.play("local-video", { enableAutoplayDialog: true });
            // Publish a stream to ZEGOCLOUD audio and video cloud. You can set `streamID` based on your service requirements but ensure that it is globally unique.
            
            zg.startPublishingStream(streamID, localStream)
        }
    });
    // // Alternative code for room login
    // (async function main(){
    //     await zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true })
    // })()
    return (
        <>
            <h1 className="text-center">Zego RTC Video Call</h1>
            <h4 className="text-center">Local video</h4>
            <div id="local-video" className="w-400 h-300 border border-gray-300 mx-auto block relative"></div>
            <h4 className="text-center">Remote video</h4>
            <div id="remote-video" className="w-400 h-300 border border-gray-300 mx-auto flex"></div>
        </>
    );
}

export default Room;