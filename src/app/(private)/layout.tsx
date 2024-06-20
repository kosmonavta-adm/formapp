import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { createClient } from '@/auth/server';
import DashboardMainContainer from '@/components/DashboardMainContainer';
import DesktopNavigation from '@/components/navigation/DesktopNavigation';
import SidebarContainer from '@/components/SidebarContainer';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { url } from '@/utils/utils';

const layout = async ({ children }: { children: ReactNode }) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect(url.login);
    }
    return (
        <SidebarContainer>
            <DesktopNavigation />
            <DashboardMainContainer>
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </DashboardMainContainer>
        </SidebarContainer>
    );
};

export default layout;
