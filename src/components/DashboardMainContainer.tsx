import { ReactNode } from 'react';

const DashboardMainContainer = ({ children }: { children: ReactNode }) => {
    return <main className="flex min-h-svh flex-1 flex-col bg-[#f7f9fa]">{children}</main>;
};

export default DashboardMainContainer;
