import { ClassValue } from 'clsx';
import Link, { LinkProps } from 'next/link';
import { ComponentPropsWithRef } from 'react';

import { cxTw } from '@/utils/utils';

type CutomLinkProps = Omit<ComponentPropsWithRef<'a'>, 'className'> & { className?: ClassValue } & LinkProps;

const CustomLink = ({ children, className, ...props }: CutomLinkProps) => {
    return (
        <Link
            className={cxTw('transition-colors hover:text-black', className)}
            {...props}
        >
            {children}
        </Link>
    );
};

export default CustomLink;
