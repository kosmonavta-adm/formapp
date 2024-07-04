'use client';

import { createContext, useContext } from 'react';

export const ProfileContext = createContext<{ id: string; subdomain: string } | null>(null);

export default function ProfileProvider({
    children,
    profile,
}: {
    children: React.ReactNode;
    profile: { id: string; subdomain: string };
}) {
    return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
}

export const useProfileContext = () => {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error('useProfileContext must be used inside the ProfileProvider');
    }

    return context;
};
