'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    differenceInMinutes,
    formatISO,
    intervalToDuration,
    isAfter,
    isBefore,
    isSameMinute,
    startOfDay,
} from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ScheduleDays } from '@/components/schedule/ScheduleWizardDayEdit';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import DailyScheduleDict from '@/dictionaries/DailyScheduleDict.json';
import FormErrorMessagesDict from '@/dictionaries/FormErrorMessagesDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { convertTimeToDate, ERROR_KEYS, getFormErrorMessage } from '@/utils/utils';

const DAILY_SCHEDULE = {
    MEETING_DURATION: 'meetingDuration',
    START_TIME: 'startTime',
    END_TIME: 'endTime',
    MEETING_INTERVAL: 'meetingInterval',
} as const;

const dailyScheduleSchema = z
    .object({
        [DAILY_SCHEDULE.MEETING_DURATION]: z
            .string()
            .min(1, ERROR_KEYS.REQUIRED)
            .refine((value) => Number(value) > 0, ERROR_KEYS.LESS_THAN_ZERO),
        [DAILY_SCHEDULE.START_TIME]: z.string().min(4, ERROR_KEYS.REQUIRED),
        [DAILY_SCHEDULE.END_TIME]: z.string().min(4, ERROR_KEYS.REQUIRED),
        [DAILY_SCHEDULE.MEETING_INTERVAL]: z
            .string()
            .min(1, ERROR_KEYS.REQUIRED)
            .refine((value) => Number(value) >= 0, ERROR_KEYS.LESS_THAN_ZERO),
    })
    .superRefine((values, context) => {
        if (values[DAILY_SCHEDULE.START_TIME].length === 0 || values[DAILY_SCHEDULE.END_TIME].length === 0) return;
        const startTime = convertTimeToDate(values[DAILY_SCHEDULE.START_TIME]);
        const endTime = convertTimeToDate(values[DAILY_SCHEDULE.END_TIME]);
        const startOfDayTime = startOfDay(new Date());

        if (isAfter(endTime, startOfDayTime) && isBefore(endTime, startTime)) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: ERROR_KEYS.END_AFTER_MIDNIGHT,
                path: [DAILY_SCHEDULE.END_TIME],
            });
        }

        if (isSameMinute(startTime, endTime)) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: ERROR_KEYS.SAME_END_AND_START,
                path: [DAILY_SCHEDULE.END_TIME],
            });
        }
    });

export type DailyScheduleData = z.infer<typeof dailyScheduleSchema>;

type DailyScheduleProps = {
    selectedDays: Date[];
    setScheduledDays: Dispatch<SetStateAction<ScheduleDays>>;
    setSelectedDays: Dispatch<SetStateAction<Date[]>>;
};

const DailySchedule = ({ setScheduledDays, selectedDays, setSelectedDays }: DailyScheduleProps) => {
    const locale = useLocaleContext();

    const t = DailyScheduleDict[locale];
    const tFormErrorMessages: Record<string, string> = FormErrorMessagesDict[locale];

    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(dailyScheduleSchema),
        defaultValues: {
            [DAILY_SCHEDULE.MEETING_DURATION]: '',
            [DAILY_SCHEDULE.START_TIME]: '',
            [DAILY_SCHEDULE.END_TIME]: '',
            [DAILY_SCHEDULE.MEETING_INTERVAL]: '',
        },
    });

    const handleEditSchedule = async (formData: DailyScheduleData) => {
        // const meetingDuration = Number(formData[DAILY_SCHEDULE.MEETING_DURATION]);
        // const meetingInterval = Number(formData[DAILY_SCHEDULE.MEETING_INTERVAL]);
        // const startTime = convertTimeToDate(formData[DAILY_SCHEDULE.START_TIME]);
        // const endTime = convertTimeToDate(formData[DAILY_SCHEDULE.END_TIME]);

        // const workdayDurationInMinutes = differenceInMinutes(endTime, startTime);
        // const workdayDuration = intervalToDuration({ start: startTime, end: endTime });
        // const appointmentsPerDay = Math.floor(workdayDurationInMinutes / meetingDuration);

        // const parsedScheduledDay = {
        //     meetingDuration,
        //     meetingInterval,
        //     startTime,
        //     endTime,
        //     workdayDuration,
        //     appointmentsPerDay,
        // };

        setScheduledDays((prevScheduledDays) => {
            const newScheduledDays = new Map(prevScheduledDays);
            selectedDays.forEach((selectedDay) => {
                const meetingDuration = Number(formData[DAILY_SCHEDULE.MEETING_DURATION]);
                const meetingInterval = Number(formData[DAILY_SCHEDULE.MEETING_INTERVAL]);
                const startTime = convertTimeToDate(formData[DAILY_SCHEDULE.START_TIME], selectedDay);
                const endTime = convertTimeToDate(formData[DAILY_SCHEDULE.END_TIME], selectedDay);

                const workdayDurationInMinutes = differenceInMinutes(endTime, startTime);
                const workdayDuration = intervalToDuration({ start: startTime, end: endTime });
                const appointmentsPerDay = Math.floor(workdayDurationInMinutes / meetingDuration);
                const date = formatISO(startOfDay(selectedDay));
                newScheduledDays.set(date, {
                    meetingDuration,
                    meetingInterval,
                    startTime,
                    endTime,
                    workdayDuration,
                    appointmentsPerDay,
                    date,
                });
            });
            return newScheduledDays;
        });

        setSelectedDays([]);

        reset();
    };

    const isNoSelectedDays = selectedDays.length === 0;
    return (
        <div className="h-fit lg:sticky lg:top-8">
            <p className="mb-4 text-lg font-bold">{t.dailySchedule}</p>
            <form
                onSubmit={handleSubmit(handleEditSchedule)}
                className="flex flex-col gap-6"
            >
                <Input
                    type="time"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> {t.beggining}
                            </>
                        ),
                    }}
                    error={getFormErrorMessage(
                        formState.errors[DAILY_SCHEDULE.START_TIME]?.message,
                        tFormErrorMessages
                    )}
                    {...register(DAILY_SCHEDULE.START_TIME)}
                />
                <Input
                    type="time"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> {t.end}
                            </>
                        ),
                    }}
                    error={getFormErrorMessage(formState.errors[DAILY_SCHEDULE.END_TIME]?.message, tFormErrorMessages)}
                    {...register(DAILY_SCHEDULE.END_TIME)}
                />
                <Input
                    type="number"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> {t.durationOfTheMeeting}
                            </>
                        ),
                    }}
                    error={getFormErrorMessage(
                        formState.errors[DAILY_SCHEDULE.MEETING_DURATION]?.message,
                        tFormErrorMessages
                    )}
                    {...register(DAILY_SCHEDULE.MEETING_DURATION)}
                />
                <Input
                    type="number"
                    min={0}
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> {t.meetingInterval}
                            </>
                        ),
                    }}
                    error={getFormErrorMessage(
                        formState.errors[DAILY_SCHEDULE.MEETING_INTERVAL]?.message,
                        tFormErrorMessages
                    )}
                    {...register(DAILY_SCHEDULE.MEETING_INTERVAL)}
                />

                <div className="flex items-baseline justify-between">
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isNoSelectedDays}
                    >
                        {t.apply}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default DailySchedule;
