'use client';
import { pl } from 'date-fns/locale/pl';
import { PropsMulti, PropsSingle } from 'react-day-picker';

import { Calendar } from '@/components/ui/Calendar';
import { useScreenSize } from '@/utils/hooks/useScreenSize';

type ScheduleCalendarBaseProps = {
    numberOfMonths: number;
    schedulesDaysAsDates: Date[];
    isInEditorMode: boolean;
};

type ScheduleCalendarSingleModeProps = {
    mode: 'single';
} & PropsSingle;
type ScheduleCalendarMultipleModeProps = {
    mode: 'multiple';
} & PropsMulti;

type ScheduleCalendarProps = ScheduleCalendarBaseProps &
    (ScheduleCalendarSingleModeProps | ScheduleCalendarMultipleModeProps);

const ScheduleCalendar = ({
    numberOfMonths,
    schedulesDaysAsDates,
    isInEditorMode,
    ...props
}: ScheduleCalendarProps) => {
    const currentDate = new Date();
    const { width } = useScreenSize();
    const getCalendarSize = (numberOfMonths: number | undefined) => {
        switch (numberOfMonths) {
            case 1: {
                if (width > 1580) {
                    return 'xl';
                } else return 'md';
            }
            case 2: {
                if (width > 1580) {
                    return 'lg';
                } else return 'md';
            }
            case 3: {
                return 'md';
            }
            default:
                return 'md';
        }
    };

    return (
        <Calendar
            {...props}
            size={getCalendarSize(numberOfMonths)}
            modifiers={{ scheduledDays: schedulesDaysAsDates }}
            modifiersClassNames={{
                scheduledDays:
                    'scheduledDay bg-red-400 aria-selected:text-white [&>*]:text-white rounded aria-selected:bg-[#ac80b9] hover:bg-opacity-80',
            }}
            {...(isInEditorMode && { disabled: { before: currentDate } })}
            locale={pl}
            hideNavigation={true}
            numberOfMonths={numberOfMonths}
        />
    );
};

export default ScheduleCalendar;
