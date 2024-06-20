'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { ComponentPropsWithoutRef, ReactNode, useId } from 'react';
import { ClassNameValue } from 'tailwind-merge';

import { ChevronDown } from '@/components/icons';
import ErrorText from '@/components/ui/ErrorText';
import { Label } from '@/components/ui/Label';
import { cxTw } from '@/utils/utils';

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({ children, ...props }: ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>) => (
    <SelectPrimitive.Trigger
        className="flex h-10 w-full items-center justify-between rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50"
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown
                className="content-end"
                width={16}
                height={16}
            />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
);

const SelectContent = ({
    children,
    position = 'popper',
    ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            className={cxTw(
                'relative top-1 z-50 flex max-h-96 max-w-[calc(100%-2px)] flex-col gap-1 overflow-hidden rounded-md border border-neutral-300 bg-white text-sm shadow-md'
            )}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport
                className={cxTw(
                    position === 'popper' &&
                        'h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]'
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
);

export const SelectItem = ({ children, ...props }: ComponentPropsWithoutRef<typeof SelectPrimitive.Item>) => (
    <SelectPrimitive.Item
        className="relative flex w-full cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none focus:bg-blue-200 focus:text-black data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        {...props}
    >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
);

type SelectProps = {
    children: ReactNode;
    label?: {
        name: string;
        className?: string;
    };
    className?: ClassNameValue;
    placeholder?: ReactNode;
    error?: string;
} & SelectPrimitive.SelectProps;

export const Select = ({ children, label, className, placeholder, error, ...props }: SelectProps) => {
    const id = useId();
    const isLabelGiven = label !== undefined;

    return (
        <div className={cxTw('flex w-full flex-col gap-2', className)}>
            {isLabelGiven && (
                <Label
                    className={cxTw('w-fit font-medium text-black', label.className)}
                    htmlFor={id}
                >
                    {label.name}
                </Label>
            )}
            <SelectRoot {...props}>
                <SelectTrigger id={id}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>{children}</SelectGroup>
                </SelectContent>
            </SelectRoot>
            {error && <ErrorText>{error}</ErrorText>}
        </div>
    );
};
