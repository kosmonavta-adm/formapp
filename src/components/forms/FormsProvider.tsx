'use client';

import { createContext, useContext } from 'react';

type FormsState = {
    scheduleCount: number;
};

const FormsContext = createContext<FormsState | undefined>(undefined);

export default function FormsProvider({ children, value }: { children: React.ReactNode; value: FormsState }) {
    return <FormsContext.Provider value={value}>{children}</FormsContext.Provider>;
}

export const useFormsContext = () => {
    const context = useContext(FormsContext);

    if (context === undefined) {
        throw new Error('useFormsContext must be used inside the FormsProvider');
    }

    return context;
};
