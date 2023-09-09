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

    // Handle movement to the previous box when a user presses delete
    if (e.key === 'Backspace' && inputValue === '' && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        prevInput.value = ''; // Clear the value of the previous box
        handleInputChange('', index - 1); // Notify the parent component about the cleared value
      }
    } else {
      // Limit input length to 1 character
      if (inputValue.length <= 1) {
        handleInputChange(inputValue, index); // Pass the entered value and index back to the parent component
      }
    }

    // Clear the current box if the user enters more than one character
    if (inputValue.length > 1) {
      inputRef.current.value = inputValue.charAt(0);
      handleInputChange(inputValue.charAt(0), index);
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
