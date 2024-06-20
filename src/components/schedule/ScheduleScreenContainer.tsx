import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithRef, forwardRef } from 'react';

import { cxTw } from '@/utils/utils';

const ScheduleScreenContainer = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'> & { asChild?: boolean }>(
    ({ className, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';
        return (
            <Comp
                ref={ref}
                className={cxTw('flex flex-col', className)}
                {...props}
            />
        );
    }
);

ScheduleScreenContainer.displayName = 'ScheduleScreenContainer';

export default ScheduleScreenContainer;
