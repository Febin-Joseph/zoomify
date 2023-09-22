import React from "react";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12AM
  const formattedMinutes = minutes.toString().padStart(2, "0"); // Add leading zero for single-digit minutes
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const Message = ({ message, isCurrentScreen }) => {
  const formattedTime = formatTimestamp(message.timestamp); // Assuming you have a timestamp property in the message object
  return (
    <div className={`flex ${isCurrentScreen ? 'justify-end m-3' : 'justify-start m-3'}`}>
      <div
        className={`rounded-lg p-2 min-w-[130px] min-h-[55px] max-w-[70%] ${isCurrentScreen ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
          } break-words overflow-hidden relative`}
      >
        <div className="pt-3 pl-3">{message.content}</div>
        <div
          className={`text-xs absolute top-0 right-0 mt-1 mr-1 text-black pr-2`}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;