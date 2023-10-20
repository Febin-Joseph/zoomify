import React, { useState, useEffect } from 'react';
import { closeBtn } from '../../../constants/icons';
import { ChatNav, Message, MsgInput } from '../../../components';
// import { useSocket } from '../../../utils/SocketProvider';

const Chat = () => {
    // const socket = useSocket();

    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showMessages, setShowMessages] = useState(true);
    const [closeChat, setCloseChat] = useState(true)

    // const 'currentusersocketid' = socket.id;

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            // a new message object with sender socket ID, timestamp, and content
            const message = {
                senderSocketId: 'currentusersocketid',
                content: newMessage,
                timestamp: Date.now(),
            };

            // Emitting the message to the server with the room info and the complete message object
            // socket.emit('chat:message', { message, room: '1' });

            // Clearing the input fieldafter sending
            setNewMessage('');
        }
    };
    function handleClose() {
        setCloseChat(false)
    }

    // Listen for incoming messages from the server
    // useEffect(() => {
    //     socket.on('chat:message', (data) => {
    //         const { message } = data;
    //         // Updating the chatMessages state to include the received message
    //         setChatMessages([...chatMessages, message]);
    //     });

    //     // Cleaning up the event listener when the component unmounts
    //     return () => {
    //         socket.off('chat:message');
    //     };
    // }, [chatMessages, socket]);

    return (
        <div>
            {/* Style for LG and greater devices */}
            <div className='hidden lg:block lg:fixed lg:bottom-0 lg:right-0 lg:h-[565px] 
                            lg:rounded-tl-[20px] lg:w-[350px] bg-[#1C1C1C]'>
                <img
                    src={closeBtn}
                    alt="close"
                    className='absolute -top-4 -right-3 p-3 w-[85px]'
                />
                <div className='top-12 flex justify-center items-center mb-10 pb-1'>
                    <ChatNav setShowMessages={setShowMessages} />
                </div>
                <div className="flex flex-col">
                    <div className='flex-1 overflow-y-auto mt-16 max-h-[390px] group'>
                        {showMessages && chatMessages.map((message, index) => (
                            <Message
                                key={index}
                                message={message}
                                isCurrentScreen={message.senderSocketId === 'currentusersocketid'}
                            />
                        ))}
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
            </div>


            {/* Style for LG lesser devices */}
            {closeChat && (
                <div className='lg:hidden flex justify-center items-center'>
                    <div className='fixed bottom-0 h-[600px] rounded-t-[20px] w-[90vw] max-w-[470px] bg-[#1C1C1C]'>
                        <img
                            src={closeBtn}
                            alt="close"
                            onClick={handleClose}
                            className='absolute -top-4 -right-3 p-3 w-[85px]'
                        />
                        <div className='top-12 flex justify-center items-center mb-10 pb-1'>
                            <ChatNav setShowMessages={setShowMessages} />
                        </div>
                        <div className="flex flex-col">
                            <div className='flex-1 overflow-y-auto mt-16 max-h-[425px] group'>
                                {showMessages && chatMessages.map((message, index) => (
                                    <Message
                                        key={index}
                                        message={message}
                                        isCurrentScreen={message.senderSocketId === 'currentusersocketid'}
                                    />
                                ))}
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;