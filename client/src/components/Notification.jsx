import React, { useState, useEffect } from 'react';

const Notification = ({ verificationStatus }) => {
    const [lineWidth, setLineWidth] = useState(0); // Initial line width
    const [lineHeight, setLineHeight] = useState(3); // Initial line height
    const [lineBorderRadius, setLineBorderRadius] = useState(5); // Initial border radius
    const notificationTime = 1500; // Set the time limit in milliseconds
    const isSuccess = verificationStatus.includes('successful');

    useEffect(() => {
        if (verificationStatus) {
            const interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(1, elapsedTime / notificationTime);

                setLineWidth(progress * 100); // Line width increases from 0 to 100 based on progress
                setLineHeight(6); // line height
                setLineBorderRadius(10); // border radius

                if (progress === 1) {
                    clearInterval(interval);
                }
            }, 16); // Approximately 60 FPS

            const startTime = Date.now();
            return () => clearInterval(interval);
        }
    }, [verificationStatus]);

    return (
        <div
            className={`w-fit min-w-[52%] max-w-[300px] bg-slate-200 h-[70px]
                 rounded-[8px] items-center border-t-0
                 justify-center text-center flex flex-col
                 ${isSuccess ? 'border-l-8 border-l-green-600' : 'border-l-8 border-l-red-500'}`}
            style={{
                position: 'relative', // To position the line within the container
                overflow: 'hidden',   // Hiding overflowing line
            }}
        >
            <div
                className={isSuccess ? 'absolute bottom-0 left-0 bg-green-500' : 'absolute bottom-0 left-0 bg-red-500'}
                style={{
                    width: `${lineWidth}%`,     // Line width based on progress
                    height: `${lineHeight}px`,  // the line height
                    borderRadius: `${lineBorderRadius}px`, // the border radius
                    transition: `width ${notificationTime / 1000}s linear`, // Width animation
                }}
            ></div>

            <p
                className={`text-center ml-3 mr-3 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                {verificationStatus}
            </p>
        </div>
    );
};

export default Notification;
