import { useEffect, useRef, useState } from 'react';

export const useScreenSize = () => {
    const isFirstRender = useRef(true);

    const [screenSize, setScreenSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        if (isFirstRender.current) {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            isFirstRender.current = false;
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return screenSize;
};
