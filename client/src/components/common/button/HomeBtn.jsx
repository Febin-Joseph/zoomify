import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeBtn = ({ value, height, width }) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    if (value === "Sign up") {
      navigate('/signup')
    } else if(value === "Sign in") {
      navigate('/signin');
    } else if(value === "Join Meeting") {
      navigate('/join')
    }
  }

  const buttonStyle = {
    width: width ? `${width}%` : '90px',
    height: height ? `${height}px` : '76px',
    borderRadius: '43px',
    backgroundColor: '#1A6093',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}
      className='text-[#E3E3E3] text-[21px] font-semibold'>
      <button style={buttonStyle} onClick={handleSignUpClick}>{value}</button>
    </div>
  );
}

export default HomeBtn;
