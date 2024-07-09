import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithRef, forwardRef } from 'react';

import { cxTw } from '@/utils/utils';

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon' | 'destructive';
    size?: 'md' | 'sm' | 'lg';
    asChild?: boolean;
} & ComponentPropsWithRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', className, asChild = false, ...props }, ref) => {
        const isPrimary = variant === 'primary';
        const isSecondary = variant === 'secondary';
        const isGhost = variant === 'ghost';
        const isIcon = variant === 'icon';
        const isDestructive = variant === 'destructive';

        const isMedium = size === 'md';
        const isSmall = size === 'sm';
        const isLarge = size === 'lg';

        const css = cxTw(
            `inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium
        transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none`,
            isPrimary && 'bg-black text-white hover:bg-neutral-900 disabled:bg-neutral-200',
            isSecondary && 'bg-neutral-100 hover:bg-neutral-100 hover:text-neutral-600',
            isGhost && 'hover:text-neutral-600',
            isDestructive && 'bg-red-500 text-white hover:bg-red-600',
            isIcon &&
                'flex h-10 aspect-square w-fit items-center transition-colors [&>svg]:h-5 [&>svg]:m-auto [&>svg]:absolute [&>svg]:inset-0 relative [&>svg]:stroke-neutral-600 [&>svg]:hover:stroke-neutral-800',
            isSmall && 'px-2 py-1 text-sm',
            isMedium && 'px-4 py-2',
            isLarge && 'px-6 py-3 text-lg',
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
