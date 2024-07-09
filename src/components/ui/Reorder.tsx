import { DragControls, Reorder, useDragControls } from 'framer-motion';
import { ComponentPropsWithoutRef, useRef } from 'react';
import { createContext, useContext } from 'react';

import { GripVertical } from '@/components/icons';
import Button from '@/components/ui/Button';

const ReorderContext = createContext<DragControls | null>(null);

function ReorderProvider({ children, controls }: { children: React.ReactNode; controls: DragControls }) {
    return <ReorderContext.Provider value={controls}>{children}</ReorderContext.Provider>;
}

const useReorderContext = () => {
    const context = useContext(ReorderContext);

    if (!context) {
        throw new Error('useReorderContext must be used inside the ReorderProvider');
    }

    return context;
};

export const ReorderGroup = ({ ...props }: ComponentPropsWithoutRef<typeof Reorder.Group>) => {
    return <Reorder.Group {...props} />;
};

export const ReorderItem = ({ children, ...props }: ComponentPropsWithoutRef<typeof Reorder.Item>) => {
    const controls = useDragControls();

    return (
        <Reorder.Item
            className="grid grid-cols-1"
            dragListener={false}
            dragControls={controls}
            {...props}
        >
            <ReorderProvider controls={controls}>{children}</ReorderProvider>
        </Reorder.Item>
    );
};

export const ReorderButton = () => {
    const controls = useReorderContext();
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    return (
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
    );
};
