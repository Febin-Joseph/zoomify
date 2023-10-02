import { useState, useEffect, useCallback } from 'react';
import { Nav, MainCard, InputBtn, MainBtn } from '../../components';
import { noProfile } from '../../constants/icons';
import { nameVerification } from '../../middleware';
import { useSocket } from '../../utils/SocketProvider';
import { useNavigate } from 'react-router-dom';

const NewMeeting = () => {
  const [nameValidation, setNameValidation] = useState('')
  const [verificationStatus, setVerificationStatus] = useState('');
  const [nameVerified, setNameVerified] = useState(false);
  const [email, setEmail] = useState('')
  const [room, setRoom] = useState('')
  const [profileImage, setProfileImage] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('_id'));

  const navigate = useNavigate();

  const socket = useSocket()
  console.log(socket);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`http://localhost:4000/profile/upload/${userId}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfileImage(data.imageUrl);
      } else {
        // Handle error here
        console.error('Image upload failed');
      }
    } catch (error) {
      // Handle network or other errors here
      console.error('Image upload error:', error);
    }
  };


  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    socket.emit('room:join', { email, room })
  },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    navigate(`/room/${room}`)
  }, [navigate])

  useEffect(() => {
    socket.on('room:join', handleJoinRoom)
    return () => {
      socket.off('room:join', handleJoinRoom)
    }
  }, [socket, handleJoinRoom]);

  useEffect(() => {
    if (verificationStatus.includes('successful')) {
      setNameVerified(true);
    }
  }, [verificationStatus]);

  //name verification middleware
  function handleNameVerification() {
    const status = nameVerification(nameValidation);
    setVerificationStatus(status);
  }

  return (
    <div className='flex flex-col bg-[#000] min-h-screen max-h-full'>
      <Nav value={"New Meeting"} />

      <div className='hidden lg:flex lg:items-center lg:justify-center lg:w-[50%]
       lg:bg-[#2B2B2B] lg:flex-grow lg:pt-7'>
        <MainCard title={"New Meeting"}>
          <div className='mt-[-30px]'>
            <p className='text-[#A1A1A1] text-[13px] text-center mb-4'>
              This Will Be Your Meeting Profile And Name
            </p>
            <img
              src={profileImage || noProfile}
              alt="profileImg"
              className='w-[100px] m-auto items-center justify-center mb-0'
              onClick={() => {
                document.getElementById('profileImageInput').click();
              }}
            />
            <input
              type="file"
              id="profileImageInput"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleImageUpload(file);
                }
              }}
            />
            <InputBtn
              text={"MEETING NAME"}
              width={85}
              height={8}
              placeholder={"Enter Meeting Name"}
              change={(e) => setNameValidation(e.target.value)}
              value={nameValidation}
            />

            <div className='mt-0'>
              <MainBtn
                value={"Continue"}
                width={60}
                height={60}
                onClick={handleNameVerification}
                maxWidth={"max-w-[100px]"}
              />

            </div>
            <p
              className={`text-center mt-2 ${verificationStatus.includes('successful') ?
                'text-green-500' : 'text-red-500'}`}>
              {verificationStatus}
            </p>
          </div>
        </MainCard>
      </div>

      {/* This is for lg less than devices */}
      <div className='justify-center items-center lg:hidden'>
        {nameVerified ? (
          <div className='flex flex-col items-center justify-center'>
            <InputBtn
              text={"MEETING ID"}
              width={85}
              height={8}
              placeholder={"Meeting ID"}
              change={(e) => setEmail(e.target.value)}
              value={email}
              showCopyIcon={true}
            />
            <div className='mt-[-35px]'>
              <InputBtn
                text={"MEETING PASSWORD"}
                type={"text"}
                width={85}
                height={8}
                placeholder={"Meeting Password"}
                change={(e) => setRoom(e.target.value)}
                value={room}
                showCopyIcon={true}
              />
            </div>
            <div className='flex items-center justify-center'>
              <p className='text-[#A1A1A1] text-[13px] lg:w-[25vw] w-[250px] text-center mt-1 mb-3'>
                This is Your Meeting Credentials to Start a Meeting
              </p>
            </div>

            <div className='mb-8'>
              <MainBtn
                value={"Start Meeting"}
                width={60}
                height={60}
                onClick={handleSubmitForm}
              />
            </div>

          </div>
        ) : (
          <div className='mt-10'>
            <p className='text-[#A1A1A1] text-[13px] text-center mb-4'>
              This Will Be Your Meeting Profile And Name
            </p>
            <img
              src={profileImage || noProfile}
              alt="profileImg"
              className='w-[100px] m-auto items-center justify-center mb-0'
              onClick={() => {
                document.getElementById('profileImageInput').click();
              }}
            />
            <input
              type="file"
              id="profileImageInput"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleImageUpload(file);
                }
              }}
            />
            <InputBtn
              text={"MEETING NAME"}
              width={85}
              height={8}
              placeholder={"Enter Meeting Name"}
              change={(e) => setNameValidation(e.target.value)}
              value={nameValidation}
            />

            <div className='mt-0'>
              <MainBtn
                value={"Continue"}
                width={60}
                height={60}
                onClick={handleNameVerification}
                maxWidth={"max-w-[100px]"}
              />

            </div>
            <p
              className={`text-center mt-2 ${verificationStatus.includes('successful') ?
                'text-green-500' : 'text-red-500'}`}>
              {verificationStatus}
            </p>
          </div>
        )}
      </div>

      {/* Right-Center Content for lg greater devices */}
      <div className='hidden lg:absolute lg:top-[80px] lg:right-0 lg:flex lg:flex-col
       lg:justify-center lg:items-center lg:h-[calc(100vh - 80px)] lg:w-[50%]'>
        <InputBtn
          text={"MEETING ID"}
          width={85}
          height={8}
          placeholder={"Meeting ID"}
          change={(e) => setEmail(e.target.value)}
          value={email}
          showCopyIcon={true}
        />

        <InputBtn
          text={"MEETING PASSWORD"}
          type={"text"}
          width={85}
          height={8}
          placeholder={"Meeting Password"}
          change={(e) => setRoom(e.target.value)}
          value={room}
          showCopyIcon={true}
        />

        <div className='flex items-center justify-center'>
          <p className='text-[#A1A1A1] text-[13px] lg:w-[25vw] w-[250px] text-center mt-1 mb-3'>
            This is Your Meeting Credentials to Start a Meeting
          </p>
        </div>

        <div className='mb-8 mt-0'>
          <MainBtn
            value={"Start Meeting"}
            width={60}
            height={60}
            maxWidth={'max-w-[300px]'}
            onClick={handleSubmitForm}
          />
        </div>
      </div>
    </div>
  );
}

export default NewMeeting;