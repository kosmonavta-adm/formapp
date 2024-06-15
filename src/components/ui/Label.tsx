import * as LabelPrimitive from '@radix-ui/react-label';
import { ClassValue } from 'clsx';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { cxTw } from '@/utils/utils';

const Label = forwardRef<
    ElementRef<typeof LabelPrimitive.Root>,
    Omit<ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, 'className'> & { className: ClassValue }
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cxTw(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            className
        )}
        {...props}
    />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
