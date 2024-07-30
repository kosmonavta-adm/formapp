import { Menu, X } from '@/components/icons';

type MobileNavigationButtonProps = {
    handleMobileNavigation: () => void;
    isMobileNavigationOpen: boolean;
};

const MobileNavigationButton = ({ handleMobileNavigation, isMobileNavigationOpen }: MobileNavigationButtonProps) => (
    <button
        onClick={handleMobileNavigation}
        className="fixed right-4 top-4 z-40 aspect-square border border-neutral-200 bg-white p-2 shadow-sm sm:right-10 xl:hidden"
    >
        {isMobileNavigationOpen ? (
            <X
                className="stroke-blue-900"
                width={24}
                height={24}
            />
        ) : (
            <Menu
                className="stroke-blue-900"
                width={24}
                height={24}
            />
        )}
    </button>
);

export default MobileNavigationButton;
