import { RefObject, useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement>(parent: RefObject<T>, handleClickOutside: () => void) => {
    useEffect(() => {
        const ref = parent.current;
        if (ref === null) return;

        const handleEvent = (e: MouseEvent) => handleClick(e, ref);

        const handleClick = (e: MouseEvent, ref: T) => {
            const { target } = e;
            if (ref && !ref.contains(target as Node)) {
                handleClickOutside();
            }
        };

        document.addEventListener('click', handleEvent);
        return () => {
            document.removeEventListener('click', handleEvent);
        };
    }, [parent]);
};
