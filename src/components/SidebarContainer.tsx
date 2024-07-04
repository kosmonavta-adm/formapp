import { ReactNode } from 'react';

const SidebarContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid grid-cols-1 overflow-y-hidden xl:grid-cols-[320px,1fr] 2xl:grid-cols-[384px,1fr]">
            {children}
        </div>
    );
};

export default SidebarContainer;
