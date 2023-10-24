import React from 'react';
import { useActiveScreens } from '../../utils/ActiveScreensContext';

const Screen = ({ children }) => {
  const { activeScreens, incrementActiveScreens, decrementActiveScreens } = useActiveScreens();

  const screenClass = `screen-${Math.max(100 / (activeScreens + 1), 100)}`;

  // Increment the count when the component is mounted and decrement when unmounted
  React.useEffect(() => {
    incrementActiveScreens();
    return () => {
      decrementActiveScreens();
    };
  }, [incrementActiveScreens, decrementActiveScreens]);


  return (
    <div className={`flex justify-start items-center ml-[90px] ${screenClass}`}>
      <div className='w-[62vw] h-[40vw] relative rounded-[30px]
       bg-black min-w-[300px] min-h-[400px] overflow-hidden'>
        {children}
      </div>
    </div>
  )
}

export default Screen