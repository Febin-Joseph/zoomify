import React, { useRef, useEffect } from 'react';

const OTPBtn = ({ handleInputChange, index, disabled }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Automatically focus the input when it's not disabled
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Ensuring only numeric input is allowed
    const numericValue = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    // Limited input length to 1 character
    if (numericValue.length <= 1) {
      e.target.value = numericValue; // Update the input value with the numeric value
      handleInputChange(numericValue, index);

      // Handle movement to the next box if a numeric value is entered
      if (numericValue && index < 3) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      } 
    }
  };

  return (
    <div>
      <input
        type="text"
        className='rounded-[10px] w-[56px] h-[49px] m-1 mt-8
       text-center font-extrabold text-[30px]'
        onChange={handleChange}
        ref={inputRef}
        disabled={disabled} // Disable input based on the prop
        maxLength={1}
      />
    </div>
  );
};

export default OTPBtn;