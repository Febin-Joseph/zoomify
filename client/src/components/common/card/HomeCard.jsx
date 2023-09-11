import React from 'react';
import MainBtn from '../button/MainBtn';
import { useNavigate } from 'react-router-dom';
import Home2btn from '../button/Home2btn';
import { newMeet, join } from '../../../constants/icons';

const HomeCard = ({ color, isAuthenticated }) => {

  const navigate = useNavigate();

  const handleClick = (value) => {
    if (value === "Sign up") {
      navigate('/signup');
    } else if (value === "Sign in") {
      navigate('/signin');
    } else if (value === "Join Meeting") {
      navigate('/join');
    }
  }

  return (
    <div className='bg-[#1F1D1D] w-[100%] relative bottom-0 
      overflow-hidden rounded-[40px] rounded-b-none 
      md:rounded-[40px] md:w-[400px] md:h-[350px]
      md:ml-auto md:mr-10 md:mb-10 md:absolute md:bottom-0 md:right-0 md:top-[220px]'>

      <div className='justify-center items-center ml-[5%] mr-[5%] text-white
        font-bold text-center pt-4 text-[23px] leading-9 mb-5'>
        <p>Welcome</p>
        {isAuthenticated === true ?
          <p className='hidden text-[15px]'>Get Started With Your Account</p>
          : <p className='text-[15px]'>Get Started With Your Account</p>
        }
      </div>

      <div className='justify-center items-center inset-0 relative mb-6'>
        {isAuthenticated === true ?
          <div className='flex mt-10
           flex-row justify-center m-auto'>
            <Home2btn
              color={'bg-[#DE5247]'}
              icon={newMeet}
              click={() => navigate('/new')}
              value={"New"}
            />
            <div className='md:ml-10 ml-14 '>
              <Home2btn
                color={'bg-[#1A6093]'}
                icon={join}
                click={() => navigate('/join')}
                value={"Join"}
              />
            </div>
          </div>
          :
          <MainBtn
            value={"Join Meeting"}
            width={90}
            height={60}
            onClick={() => handleClick("Join Meeting")}
          />}

        <MainBtn
          value="Sign in"
          width={80}
          height={60}
          onClick={() => handleClick("Sign in")}
        />

        <MainBtn
          value="Sign up"
          width={70}
          height={60}
          onClick={() => handleClick("Sign up")}
        />
      </div>
    </div>
  );
}

export default HomeCard;