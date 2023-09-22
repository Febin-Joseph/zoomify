const Message = ({ message, isCurrentScreen }) => {
  const isCurrentUser = isCurrentScreen;

  const messageContainerStyle = isCurrentUser
    ? 'flex justify-end'
    : 'flex justify-start';

  const messageStyle = isCurrentUser
    ? 'bg-[#8AC78D] rounded-l-[30px] rounded-b-[20px] pl-6 pt-[2px] ml-2'
    : 'bg-white rounded-r-[30px] rounded-b-[20px] pl-4 pt-[2px] mr-2';

  const senderName = isCurrentUser ? 'You' : message.sender;

  return (
    <div className={messageContainerStyle}>
      <div className={`w-[185px] h-[62px] ${messageStyle}`}>
        <label htmlFor="name" className="text-[13px] text-[#5C5C5C]">
          {senderName}
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
