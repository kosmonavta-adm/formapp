import { ReactNode } from 'react';

const Sidebar = ({ children }: { children: ReactNode }) => {
    return (
        <aside className="z-50 hidden min-h-svh flex-shrink-0 gap-12 border-r border-r-neutral-100 bg-white xl:flex xl:w-80 2xl:w-96">
            <nav className="fixed bottom-32 top-24 m-auto flex min-h-[80svh] w-full max-w-80 flex-col 2xl:max-w-96">
                {children}
            </nav>
        </aside>
    );
};

export default Sidebar;
