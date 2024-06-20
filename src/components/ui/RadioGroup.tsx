'use client';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react';

import { cxTw } from '@/utils/utils';

const RadioGroup = forwardRef<
    ElementRef<typeof RadioGroupPrimitive.Root>,
    ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cxTw('flex flex-col gap-2', className)}
            {...props}
            ref={ref}
        />
    );
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<
    ElementRef<typeof RadioGroupPrimitive.Item>,
    ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { label: string }
>(({ className, label, ...props }, ref) => {
    const id = useId();
    return (
        <div className="flex items-center gap-2">
            <RadioGroupPrimitive.Item
                id={id}
                ref={ref}
                className={cxTw(
                    'border-primary text-primary ring-offset-background focus-visible:ring-ring aspect-square h-5 w-5 rounded-full border border-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            >
                <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                    <div className="text-current h-2.5 w-2.5 rounded-full bg-blue-400" />
                </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <label
                className="cursor-pointer"
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
