import React, { useState, useEffect } from 'react';

const Notification = ({ verificationStatus }) => {
    const [lineWidth, setLineWidth] = useState(0);
    const [lineHeight, setLineHeight] = useState(3);
    const [lineBorderRadius, setLineBorderRadius] = useState(5);
    const notificationTime = 1500;
    const isSuccess = verificationStatus.includes('successful');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (verificationStatus) {
            const interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(1, elapsedTime / notificationTime);

                setLineWidth(progress * 100);
                setLineHeight(6);
                setLineBorderRadius(10);

                if (progress === 1) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 3000);
                }
            }, 16);

            const startTime = Date.now();
            return () => clearInterval(interval);
        }
    }, [verificationStatus]);

    return (
        <div className={`w-fit min-w-[52%] max-w-[300px] bg-slate-200 h-[70px]
                 rounded-[8px] items-center border-t-0
                 justify-center text-center flex flex-col
                 ${isSuccess ? 'border-l-8 border-l-green-600' : 'border-l-8 border-l-red-500'}`}
            style={{
                position: 'relative',
                overflow: 'hidden',
                display: isVisible ? 'flex' : 'none',
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
