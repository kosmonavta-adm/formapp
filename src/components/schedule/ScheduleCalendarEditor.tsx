'use client';
import { eachDayOfInterval, isWeekend } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

import { getDifferenceInMonths } from '@/components/schedule/_scheduleUtils';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar';
import { ScheduleDays } from '@/components/schedule/ScheduleWizardDayEdit';
import Button from '@/components/ui/Button';
import ScheduleCalendarDict from '@/dictionaries/ScheduleCalendarDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';

type ScheduleCalendarProps = {
    selectedDays: Date[];
    scheduledDays: ScheduleDays;
    currentDate: Date;
    endDate: Date;
    setSelectedDays: Dispatch<SetStateAction<Date[]>>;
    setScheduledDays: Dispatch<SetStateAction<ScheduleDays>>;
};

const ScheduleCalendarEditor = ({
    setSelectedDays,
    selectedDays,
    currentDate,
    endDate,
    scheduledDays,
    setScheduledDays,
}: ScheduleCalendarProps) => {
    const locale = useLocaleContext();

    const t = ScheduleCalendarDict[locale];

    const allDatesBetween = eachDayOfInterval({ start: currentDate, end: endDate });

    const numberOfMonths = getDifferenceInMonths({ startDate: currentDate, endDate });

    const schedulesDaysAsDates = Array.from(scheduledDays.keys()).map((scheduledDay) => new Date(scheduledDay));
    const handleSelectAllWorkdays = () => {
        const result = allDatesBetween.filter((date) => isWeekend(date) === false);
        setSelectedDays(result);
    };

    const handleSelectAllWeekends = () => {
        const result = allDatesBetween.filter((date) => isWeekend(date));
        setSelectedDays(result);
    };

    const handleDeselectAllDays = () => setSelectedDays([]);

    const handleDeleteAppointments = () =>
        setScheduledDays((prevScheduledDays) => {
            const newScheduledDays = new Map(prevScheduledDays.entries());
            selectedDays.forEach((selectedDay) => {
                const scheduledDayKey = selectedDay.toISOString();
                newScheduledDays.delete(scheduledDayKey);
            });
            return newScheduledDays;
        });

    const isAnyDaySelected = selectedDays.length > 0;
    const isAnyAppointmentInSelectedDays = selectedDays.some((selectedDay) =>
        scheduledDays.has(selectedDay.toISOString())
    );

    return (
        <div className="mx-auto overflow-hidden rounded-md bg-white shadow">
            <div className="flex w-full justify-end gap-8 bg-blue-500 px-6 py-3">
                {isAnyAppointmentInSelectedDays && (
                    <Button
                        variant="ghost"
                        className="p-0 text-white hover:text-neutral-100"
                        size="sm"
                        onClick={handleDeleteAppointments}
                    >
                        {t.delete}
                        {/* TODO: Icons insted of text in lower resolutions */}
                    </Button>
                )}
                {isAnyDaySelected && (
                    <Button
                        variant="ghost"
                        className="p-0 text-white hover:text-neutral-100"
                        size="sm"
                        onClick={handleDeselectAllDays}
                    >
                        {t.deselect}
                    </Button>
                )}

                <Button
                    variant="ghost"
                    className="p-0 text-white hover:text-neutral-100"
                    size="sm"
                    onClick={handleSelectAllWorkdays}
                >
                    {t.allWorkdays}
                </Button>
                <Button
                    variant="ghost"
                    className="p-0 text-white hover:text-neutral-100"
                    size="sm"
                    onClick={handleSelectAllWeekends}
                >
                    {t.allWeekends}
                </Button>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <ScheduleCalendar
                    numberOfMonths={numberOfMonths}
                    schedulesDaysAsDates={schedulesDaysAsDates}
                    selected={selectedDays}
                    onSelect={(dates) => setSelectedDays(dates || [])}
                    mode="multiple"
                    isInEditorMode={true}
                />
                <div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm bg-red-400"></div>
                        <p>{t.dayWithSchedule}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm bg-blue-400"></div>
                        <p>{t.selectedDayWithoutSchedule}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm bg-[#ac80b9]"></div>
                        <p>{t.selectedDayWithSchedule}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleCalendarEditor;
