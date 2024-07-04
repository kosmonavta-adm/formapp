import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { createClient } from '@/auth/server';
import DashboardMainContainer from '@/components/DashboardMainContainer';
import DesktopNavigation from '@/components/navigation/DesktopNavigation';
import { prefetchProfile } from '@/components/profile/getProfile.server';
import SidebarContainer from '@/components/SidebarContainer';
import { url } from '@/utils/utils';

const layout = async ({ children }: { children: ReactNode }) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect(url.login);
    }

    const queryClient = await prefetchProfile();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SidebarContainer>
                <DesktopNavigation />
                <DashboardMainContainer>{children}</DashboardMainContainer>
            </SidebarContainer>
        </HydrationBoundary>
    );
};

export default layout;
