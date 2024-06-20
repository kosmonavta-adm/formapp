import { menu } from '@/components/navigation/_navigationUtils';
import Sidebar from '@/components/navigation/Sidebar';
import CustomLink from '@/components/ui/CustomLink';

const DesktopNavigation = () => {
    return (
        <Sidebar>
            {menu.map((item) => (
                <CustomLink
                    key={item.id}
                    href={item.url}
                >
                    {item.name}
                </CustomLink>
            ))}
        </Sidebar>
    );
};

export default DesktopNavigation;
