'use client';

import { createContext, useContext } from 'react';

export const LocaleContext = createContext<'pl' | 'en'>('pl');

export default function LocaleProvider({ children, locale }: { children: React.ReactNode; locale: 'pl' | 'en' }) {
    return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export const useLocaleContext = () => {
    const context = useContext(LocaleContext);

    if (!context) {
        throw new Error('useLocaleContext must be used inside the LocaleProvider');
    }

    return context;
};
