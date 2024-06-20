import { ClassValue } from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import { cxTw } from '@/utils/utils';

const Label = ({
    className,
    ...props
}: Omit<ComponentPropsWithoutRef<'label'>, 'className'> & { className: ClassValue }) => (
    <label
        className={cxTw(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            className
        )}
        {...props}
    />
);

export { Label };
