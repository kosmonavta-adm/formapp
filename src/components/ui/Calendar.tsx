'use client';

import * as React from 'react';
import { DayPicker, Mode } from 'react-day-picker';

import { cxTw } from '@/utils/utils';

export type CalendarProps<T extends Mode> = React.ComponentProps<typeof DayPicker<T>> & { size?: 'md' | 'lg' | 'xl' };

function Calendar<T extends Mode>({ className, classNames, size = 'md', ...props }: CalendarProps<T>) {
    const getNumberOfColumns = (numberOfMonths: number | undefined) => {
        if (numberOfMonths === undefined || numberOfMonths === 1) return 'grid-cols-1';
        else if (numberOfMonths === 2) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-1 ultra:grid-cols-2';
        else return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-1 3xl:grid-cols-2 ultra:grid-cols-3';
    };

    return (
        <DayPicker
            classNames={{
                months: cxTw('grid gap-8 relative', getNumberOfColumns(props.numberOfMonths)),
                month_wrapper: 'flex flex-col',
                month_caption: cxTw('mx-auto flex'),
                caption_label: cxTw('font-medium', size === 'xl' && 'text-2xl font-bold'),
                nav: 'absolute h-6 space-x-1 flex justify-between w-full items-center',
                button_previous: 'left-0 absolute',
                button_next: 'right-0 absolute',

                weekdays: 'grid grid-cols-7',
                weekday: cxTw(
                    'flex items-center justify-center font-medium m-1',
                    size === 'md' && 'w-10 h-10',
                    size === 'lg' && 'w-16 h-16',
                    size === 'xl' && 'h-20 w-20 text-xl'
                ),
                weeks: 'flex flex-col',
                week: 'grid grid-cols-7',

                day: cxTw(
                    'flex items-center aria-disabled:cursor-default justify-center cursor-pointer rounded [&:not([aria-selected]):not(.scheduledDay)]:hover:bg-neutral-50 m-1 aria-selected:hover:bg-opacity-80',
                    size === 'md' && 'w-10 h-10',
                    size === 'lg' && 'w-16 h-16',
                    size === 'xl' && 'h-20 w-20 text-xl font-light'
                ),

                selected: 'bg-blue-400 [&>*]:text-white rounded',

                outside: 'day-outside opacity-50 aria-selected:bg-accent/50 aria-selected:opacity-30',
                disabled: '[&>*]:text-neutral-100',

                hidden: 'invisible',

                ...classNames,
            }}
            {...props}
        />
    );
}

export { Calendar };
