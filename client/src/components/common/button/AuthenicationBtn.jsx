import React from 'react';
import { GithubLogo } from '../../../constants/icons';

const AuthenicationBtn = ({ value, logo }) => {

  const auth = () => {
    if (value.includes('Google')) {
      window.open('https://zoomify-backend.onrender.com/auth/google/callback',
        "_self"
      )
    } else if (value.includes('Github')) {
      window.open('https://zoomify-backend.onrender.com/auth/github/callback',
        "_self"
      )
    }
  }

  return (
    <div>
      <button
        onClick={auth}
        className='flex items-center bg-[#FFFFFF] 
        w-[300px] h-[50px] text-[#1D201B] text-[15px] font-bold mt-4 rounded-[10px] text-center'>
        <img src={logo} alt="logos" className={`w-[60px] items-center justify-center ml-5 
        ${logo === GithubLogo ? 'github-logo' : ''}`}
        />
        <span className="flex-grow mr-10">{value}</span>
      </button>
    </div>
  );
}

export default AuthenicationBtn;
