import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithRef, forwardRef } from 'react';

import { cxTw } from '@/utils/utils';

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'default' | 'sm' | 'icon';
    asChild?: boolean;
} & ComponentPropsWithRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'default', className, asChild = false, ...props }, ref) => {
        const isPrimary = variant === 'primary';
        const isSecondary = variant === 'secondary';
        const isGhost = variant === 'ghost';
        const isDestructive = variant === 'destructive';

        const isDefaultSize = size === 'default';
        const isSmall = size === 'sm';

        const css = cxTw(
            `inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold border
        transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none`,
            isPrimary &&
                'border-transparent bg-blue-600 text-white hover:border-transparent hover:bg-blue-700 disabled:bg-neutral-200',
            isSecondary &&
                'bg-neutral-50 border-neutral-100 hover:bg-neutral-100 hover:border-neutral-200 hover:text-neutral-600',
            isGhost && 'border-0 hover:text-neutral-600',
            isDestructive && 'bg-red-500 border-transparent text-white hover:bg-red-600 hover:border-red-600',
            isDefaultSize && 'px-4 py-2',
            isSmall && 'px-2 py-1 text-sm',

            className
        );

        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                className={css}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export default Button;
