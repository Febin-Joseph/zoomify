const Message = ({ message, currentUser }) => {
  const messageContainerStyle = currentUser
    ? 'flex justify-end' // Align message container to the right for the sender
    : 'flex justify-start'; // Align message container to the left for others

  const messageStyle = currentUser
    ? 'bg-[#8AC78D] rounded-l-[30px] rounded-b-[20px] pl-6 pt-[2px] ml-2' // Adjust styles for sender
    : 'bg-white rounded-r-[30px] rounded-b-[20px] pl-4 pt-[2px] mr-2'; // Adjust styles for others

  return (
    <div className={messageContainerStyle}>
      <div className={`w-[185px] h-[62px] ${messageStyle}`}>
        <label htmlFor="name" className="text-[13px] text-[#5C5C5C]">
          {currentUser ? 'You' : message.sender}
        </label>

        <label htmlFor="Date" className="text-[11.5px] pl-16 text-[#5C5C5C]">
          {message.timestamp}
        </label>

        <p className="text-[13px] mt-1 text-black font-semibold">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default Message;