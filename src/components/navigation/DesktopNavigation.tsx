'use client';
import { usePathname } from 'next/navigation';

import { logoutUser } from '@/components/auth/_authActions';
import { menu } from '@/components/navigation/_navigationUtils';
import Sidebar from '@/components/navigation/Sidebar';
import Button from '@/components/ui/Button';
import CustomLink from '@/components/ui/CustomLink';
import { cxTw } from '@/utils/utils';

const DesktopNavigation = () => {
    const pathname = usePathname();
    const handleLogout = async () => await logoutUser();

    return (
        <Sidebar>
            <div className="flex h-full flex-col">
                <h1 className="mb-16 text-center text-3xl font-black">FormApp</h1>
                <menu className="ml-8 flex h-full w-3/4 flex-col gap-4">
                    {menu.map((item) => (
                        <li key={item.id}>
                            <CustomLink
                                className={cxTw('text-lg', pathname === item.url && 'font-semibold')}
                                href={item.url}
                            >
                                {item.name}
                            </CustomLink>
                        </li>
                    ))}
                    <Button
                        className="mt-auto p-0"
                        variant="ghost"
                        onClick={handleLogout}
                    >
                        Wyloguj się
                    </Button>
                </menu>
            </div>
        </Sidebar>
    );
};

export default DesktopNavigation;
