'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { cxTw } from '@/utils/utils';

const Separator = forwardRef<
    ElementRef<typeof SeparatorPrimitive.Root>,
    ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cxTw(
            'shrink-0 bg-neutral-200',
            orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
            className
        )}
        {...props}
    />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
