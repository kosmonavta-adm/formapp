'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logoutUser } from '@/components/auth/_authActions';
import { checkIsActivePage, menu } from '@/components/navigation/_navigationUtils';
import MobileNavigationButton from '@/components/navigation/MobileNavigationButton';
import DesktopNavigationDict from '@/dictionaries/DesktopNavigationDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { cxTw } from '@/utils/utils';

type MobileNavigationProps = {
    handleMobileNavigation: () => void;
    isMobileNavigationOpen: boolean;
};

const MobileNavigation = ({ handleMobileNavigation, isMobileNavigationOpen }: MobileNavigationProps) => {
    const pathname = usePathname();
    const handleLogout = async () => await logoutUser();
    const locale = useLocaleContext();

    const t = DesktopNavigationDict[locale];

    return (
        <nav
            className="fixed inset-0 z-[100] flex h-full w-full flex-col justify-center border-t border-neutral-100 bg-neutral-50 shadow lg:hidden"
            data-mobile-navigation-open={isMobileNavigationOpen}
        >
            <MobileNavigationButton
                handleMobileNavigation={handleMobileNavigation}
                isMobileNavigationOpen={isMobileNavigationOpen}
            />
            <div className="flex flex-col items-center justify-center gap-12">
                {menu.map(({ id, url, name }) => {
                    const isActivePage = checkIsActivePage(url, pathname);
                    const isNotActivePage = isActivePage === false;
                    return (
                        <Link
                            key={id}
                            href={url}
                            className={cxTw(
                                'group flex w-fit flex-col items-center justify-center gap-1 font-medium text-neutral-900 transition-colors',
                                isNotActivePage && 'hover:text-neutral-400',
                                isActivePage && 'text-neutral-600'
                            )}
                        >
                            {name(locale)}
                        </Link>
                    );
                })}
                <button
                    className="group flex w-fit flex-col items-center justify-center gap-1 font-medium text-neutral-900 transition-colors hover:text-neutral-400"
                    onClick={handleLogout}
                >
                    {t.logout}
                </button>
            </div>
        </nav>
    );
};

export default MobileNavigation;
