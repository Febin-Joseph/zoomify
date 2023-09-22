import React, { useState, useEffect } from 'react';
import { closeBtn } from '../../../constants/icons';
import { ChatNav, Message, MsgInput } from '../../../components';
import { useSocket } from '../../../utils/SocketProvider';

const Chat = () => {
    const socket = useSocket();

    // State to store chat messages and user input
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Get the current user's socket ID
    const currentUserSocketId = socket.id;

    // Function to handle sending a new chat message
    // Function to handle sending a new chat message
    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            // Create a new message object with sender socket ID, timestamp, and content
            const message = {
                senderSocketId: currentUserSocketId,
                content: newMessage,
                timestamp: Date.now(),
            };

            // Emit the chat message to the server with the room information and the complete message object
            socket.emit('chat:message', { message, room: '1' }); // Replace 'your-room-name' with the actual room name

            // Clear the input field
            setNewMessage('');
        }
    };


    // Listen for incoming chat messages from the server
    useEffect(() => {
        socket.on('chat:message', (data) => {
            const { message } = data;
            // Update the chatMessages state to include the received message
            setChatMessages([...chatMessages, message]);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('chat:message');
        };
    }, [chatMessages, socket]);

    return (
        <div className='fixed bottom-0 right-0 lg:h-[41vw] rounded-tl-[45px] lg:w-[26.7vw] bg-[#2B2B2BA6]'>
            <img
                src={closeBtn}
                alt="close"
                className='absolute -top-4 -right-3 p-3 w-[85px]'
            />
            <div className='top-12 flex justify-center items-center'>
                <ChatNav />
            </div>
            <div className="flex flex-col">
                <div className='flex-1 overflow-y-auto'>
                    {chatMessages.map((message, index) => (
                        <Message
                            key={index}
                            message={message}
                            isCurrentScreen={message.senderSocketId === currentUserSocketId}
                        />
                    ))}
                </div>
            </div>
            {/* Message input */}
            <div className="flex justify-center items-center">
                <MsgInput
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onSend={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;