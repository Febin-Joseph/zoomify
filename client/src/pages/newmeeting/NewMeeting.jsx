import { useState, useEffect } from 'react';
import { Nav, MainCard, InputBtn, MainBtn } from '../../components';
import { noProfile } from '../../constants/icons';
import { nameVerification } from '../../middleware';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewMeeting = () => {
  const [nameValidation, setNameValidation] = useState('')
  const [verificationStatus, setVerificationStatus] = useState('');
  const [nameVerified, setNameVerified] = useState(false);
  const [roomId, setRoomId] = useState('')
  const [meetingPassword, setMeetingPassword] = useState('')
  const [profileImage, setProfileImage] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('_id'));

  const navigate = useNavigate();
  const uid = Math.floor(Math.random() * 100000);

  //FETCHING MEETING ID
  async function meetingId() {
    try {
      const response = await axios.get("https://zoomify-backend.onrender.com/meeting/id")
      const data = response.data.meetingID
      if (data) {
        setRoomId(data)
      }
    } catch (error) {
      console.error('Error fetching meeting ID:', error);
    }
  }

  useEffect(() => {
    meetingId();
  }, []);

  //FETCHING MEETING PASSWORD
  async function meetingPswd() {
    try {
      const response = await axios.get("https://zoomify-backend.onrender.com/meeting/pswd")
      const data = response.data.meetingPswd
      if (data) {
        setMeetingPassword(data)
      }
    } catch (error) {
      console.error('Error fetching meeting ID:', error);
    }
  }

  useEffect(() => {
    meetingPswd();
  }, []);


  //name verification middleware
  function handleNameVerification() {
    const status = nameVerification(nameValidation);
    setVerificationStatus(status);

    if (status.includes('successful')) {
      localStorage.setItem('_userName', nameValidation);
    }
  }

  //retreiving storaed name from local storage
  useEffect(() => {
    const savedName = localStorage.getItem('_userName');
    if (savedName) {
      setNameValidation(savedName);
    }
  }, []);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://zoomify-backend.onrender.com/profile/upload/${userId}`, {
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

  useEffect(() => {
    if (verificationStatus.includes('successful')) {
      setNameVerified(true);
    }
  }, [verificationStatus]);

  return (
    <div className='flex flex-col bg-[#000] min-h-screen max-h-full overflow-y-hidden'>
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
              value={roomId}
              showCopyIcon={true}
              disabled={true}
            />
            <div className='mt-[-35px]'>
              <InputBtn
                text={"MEETING PASSWORD"}
                type={"text"}
                width={85}
                height={8}
                placeholder={"Meeting Password"}
                value={meetingPassword}
                showCopyIcon={true}
                disabled={true}
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
                onClick={() => {
                  navigate(`/room/${roomId}/${uid}`)
                }}
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
          value={roomId}
          showCopyIcon={true}
          disabled={true}
        />

        <InputBtn
          text={"MEETING PASSWORD"}
          type={"text"}
          width={85}
          height={8}
          placeholder={"Meeting Password"}
          value={meetingPassword}
          showCopyIcon={true}
          disabled={true}
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
            onClick={() => {
              navigate(`/room/${roomId}/${uid}`)
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NewMeeting;