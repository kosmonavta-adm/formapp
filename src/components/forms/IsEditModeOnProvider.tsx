'use client';

import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type IsEditModeOnContextState = {
    isEditModeOn: boolean;
    setIsEditModeOn: Dispatch<SetStateAction<boolean>>;
};

export const IsEditModeOnContext = createContext<IsEditModeOnContextState | null>(null);

export default function IsEditModeOnProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: IsEditModeOnContextState;
}) {
    return <IsEditModeOnContext.Provider value={value}>{children}</IsEditModeOnContext.Provider>;
}

export const useIsEditModeOnContext = () => {
    const context = useContext(IsEditModeOnContext);

    if (!context) {
        throw new Error('useIsEditModeOnContext must be used inside the IsEditModeOnProvider');
    }

    return context;
};
