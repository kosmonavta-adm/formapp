import { ReactNode } from 'react';

const Sidebar = ({ children }: { children: ReactNode }) => {
    return (
        <nav className="z-50 hidden min-h-svh flex-shrink-0 gap-12 shadow-xl xl:flex xl:w-80 2xl:w-96">
            <div className="fixed bottom-32 top-24 m-auto flex min-h-[80svh] w-full max-w-80 flex-col 2xl:max-w-96">
                {children}
            </div>
        </nav>
    );
};

export default Sidebar;
