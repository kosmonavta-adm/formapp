'use client';
import { ReactNode, useState } from 'react';

import MobileNavigation from '@/components/navigation/MobileNavigation';
import MobileNavigationButton from '@/components/navigation/MobileNavigationButton';

const Template = ({ children }: { children: ReactNode }) => {
    const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
    const handleMobileNavigation = () => {
        setIsMobileNavigationOpen((prevIsMobileNavigationOpen) => !prevIsMobileNavigationOpen);
    };
    return (
        <>
            <MobileNavigationButton
                handleMobileNavigation={handleMobileNavigation}
                isMobileNavigationOpen={isMobileNavigationOpen}
            />
            {isMobileNavigationOpen && (
                <MobileNavigation
                    handleMobileNavigation={handleMobileNavigation}
                    isMobileNavigationOpen={isMobileNavigationOpen}
                />
            )}
            {children}
        </>
    );
};

export default Template;
