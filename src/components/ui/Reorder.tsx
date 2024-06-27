import { Reorder, useDragControls } from 'framer-motion';
import { ComponentPropsWithoutRef, useRef } from 'react';

import { GripVertical } from '@/components/icons';
import Button from '@/components/ui/Button';

export const ReorderGroup = ({ ...props }: ComponentPropsWithoutRef<typeof Reorder.Group>) => {
    return <Reorder.Group {...props} />;
};

export const ReorderItem = ({ children, ...props }: ComponentPropsWithoutRef<typeof Reorder.Item>) => {
    const controls = useDragControls();
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    return (
        <Reorder.Item
            className="grid grid-cols-[1fr,auto] items-end gap-2"
            dragListener={false}
            dragControls={controls}
            {...props}
        >
            {children}
            <Button
                ref={buttonRef}
                variant="icon"
                className="cursor-grab self-end"
                onPointerDown={(e) => {
                    if (buttonRef.current === null) {
                        throw new Error('Reorder button is not defined');
                    }
                    buttonRef.current.style.setProperty('cursor', 'grabbing');
                    buttonRef.current.style.setProperty('background-color', 'rgb(209 209 209 / var(--tw-bg-opacity))');
                    controls.start(e);
                }}
                onPointerUp={() => {
                    buttonRef.current?.style.removeProperty('cursor');
                    buttonRef.current?.style.removeProperty('background-color');
                }}
            >
                <GripVertical className="w-6" />
            </Button>
        </Reorder.Item>
    );
};
