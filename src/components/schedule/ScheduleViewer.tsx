import { addMinutes, formatISO, startOfDay } from 'date-fns';
import { format } from 'date-fns/format';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { getDifferenceInMonths } from '@/components/schedule/_scheduleUtils';
import { ScheduleSchemaRevived } from '@/components/schedule/queries/_scheduleQueriesUtils';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar';
import { ScheduleDays } from '@/components/schedule/ScheduleWizardDayEdit';

type ScheduleViewerProps = {
    scheduleData: ScheduleSchemaRevived;
};

const ScheduleViewer = ({ scheduleData }: ScheduleViewerProps) => {
    const scheduledDaysAsMap = scheduleData.data.reduce<ScheduleDays>((result, item) => {
        result.set(item.date, item);
        return result;
    }, new Map());

    const { startDate, endDate } = scheduleData;
    const numberOfMonths = getDifferenceInMonths({ startDate, endDate });
    const [selectedDayData, setSelectedDayData] = useState(() =>
        scheduledDaysAsMap.get(formatISO(startOfDay(new Date())))
    );

    const [selectedDay, setSelectedDay] = useState<Date>(startOfDay(new Date()));
    const schedulesDaysAsDates = scheduleData.data.reduce<Date[]>((result, item) => {
        result.push(new Date(item.date));
        return result;
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="mx-auto flex w-full max-w-screen-3xl flex-col gap-16 px-8 py-16 xl:px-16"
        >
            <div className="mx-auto grid grid-cols-1 items-start gap-16 lg:grid-cols-[360px,max-content]">
                <div className="flex flex-col gap-2">
                    {new Array(selectedDayData?.appointmentsPerDay ?? 0).fill(undefined).map((_, index) => {
                        const startTime = format(
                            addMinutes(
                                selectedDayData!.startTime,
                                index * selectedDayData!.meetingDuration + selectedDayData!.meetingInterval * index
                            ),
                            'HH:mm'
                        );
                        const endTime = format(
                            addMinutes(
                                selectedDayData!.startTime,
                                index * selectedDayData!.meetingDuration +
                                    selectedDayData!.meetingDuration +
                                    selectedDayData!.meetingInterval * index
                            ),
                            'HH:mm'
                        );
                        return (
                            <div
                                key={index}
                                className="h-20 bg-blue-200 p-2"
                            >
                                <p>{`${startTime}-${endTime}`}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="sticky top-0 mx-auto overflow-hidden rounded-md bg-white shadow">
                    <ScheduleCalendar
                        mode="single"
                        numberOfMonths={numberOfMonths}
                        schedulesDaysAsDates={schedulesDaysAsDates}
                        selected={selectedDay}
                        isInEditorMode={false}
                        onSelect={(selectedDay) => {
                            if (selectedDay !== undefined) {
                                setSelectedDayData(scheduledDaysAsMap.get(formatISO(startOfDay(selectedDay))));
                                setSelectedDay(selectedDay);
                            }
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default ScheduleViewer;
