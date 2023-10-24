import React, { createContext, useContext, useState } from 'react';

const ActiveScreensContext = createContext();

export function ActiveScreensProvider({ children }) {
    const [activeScreens, setActiveScreens] = useState(0);

    const incrementActiveScreens = () => {
        setActiveScreens((count) => count + 1);
    };

    const decrementActiveScreens = () => {
        setActiveScreens((count) => count - 1);
    };

    return (
        <ActiveScreensContext.Provider
            value={{
                activeScreens,
                incrementActiveScreens,
                decrementActiveScreens,
            }}
        >
            {children}
        </ActiveScreensContext.Provider>
    );
}

export function useActiveScreens() {
    return useContext(ActiveScreensContext);
}