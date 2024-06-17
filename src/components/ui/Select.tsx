'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { ComponentPropsWithoutRef, ReactNode, useId } from 'react';
import { ClassNameValue } from 'tailwind-merge';

import { ArrowDown } from '@/components/icons';
import ErrorText from '@/components/ui/ErrorText';
import { cxTw } from '@/utils/utils';

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({ children, ...props }: ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>) => (
    <SelectPrimitive.Trigger
        className="flex h-11 w-full items-center justify-between rounded border border-blue-100 bg-white px-3 py-1 text-base text-black shadow-sm transition-colors focus:outline-none focus:ring-1 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <ArrowDown
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
                'relative top-1 z-50 flex max-h-96 max-w-[calc(100%-2px)] flex-col gap-1 overflow-hidden rounded border border-blue-100 bg-white shadow-md'
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
                <label
                    className={cxTw('w-fit font-medium text-black', label.className)}
                    htmlFor={id}
                >
                    {label.name}
                </label>
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
