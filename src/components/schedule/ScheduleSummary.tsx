import { format, formatDuration, set } from 'date-fns';
import { pl } from 'date-fns/locale/pl';
import { Dispatch, SetStateAction, useState } from 'react';

import { ScheduleDay, ScheduleDays } from '@/components/schedule/ScheduleWizardDayEdit';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import ScheduleSummaryDict from '@/dictionaries/ScheduleSummaryDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';

type ScheduledSummaryProps = {
    scheduledDays: ScheduleDays;
    setScheduledDays: Dispatch<SetStateAction<ScheduleDays>>;
};

const ScheduleSummary = ({ scheduledDays, setScheduledDays }: ScheduledSummaryProps) => {
    const locale = useLocaleContext();

    const t = ScheduleSummaryDict[locale];

    const scheduledDaysGroupedByMonth = Array.from(scheduledDays.entries()).reduce<
        Map<string, (ScheduleDay & { date: string })[]>
    >((result, [date, scheduledDay]) => {
        const formatedDate = format(date, 'yyyy-MM');
        const newScheduledDay = { ...scheduledDay, date };

        if (result.has(formatedDate)) {
            const entries = result.get(formatedDate);
            entries!.push(newScheduledDay);
            result.set(formatedDate, entries!);
        } else {
            result.set(formatedDate, [newScheduledDay]);
        }

        return result;
    }, new Map());

    const [listSelectedDays, setListSelectedDays] = useState<Set<string>>(new Set());

    const handleDeleteAppointmentsFromMonth = (scheduledDays: (ScheduleDay & { date: string })[]) =>
        setScheduledDays((prevScheduledDays) => {
            const newScheduledDays = new Map(prevScheduledDays.entries());
            scheduledDays.forEach(({ date }) => {
                if (listSelectedDays.has(date)) {
                    newScheduledDays.delete(date);
                }
            });

            return newScheduledDays;
        });
    return (
        <div className="">
            <div className="hidden 2xl:sticky 2xl:top-0 2xl:z-50 2xl:block 2xl:w-full 2xl:bg-neutral-50">
                <div className="grid grid-cols-1 border border-b-0 border-neutral-100 px-4 py-2 2xl:grid-cols-4">
                    <p className="font-bold">{t.date}</p>
                    <p className="font-bold 2xl:justify-self-start">{t.appointmentsCount}</p>
                    <p className="font-bold 2xl:justify-self-start">{t.workTime}</p>

                    <p className="font-bold 2xl:justify-self-end">{t.durationOfAppointment}</p>
                </div>
            </div>
            <div className="grid gap-8">
                {Array.from(scheduledDaysGroupedByMonth.entries()).map(([date, scheduledDaysFromMonth]) => {
                    const [year, month] = date.split('-');
                    const groupDate = set(new Date(), { year: Number(year), month: Number(month) - 1 });

                    const isAnySchedulesDayChecked = scheduledDaysFromMonth.some((scheduledDay) =>
                        listSelectedDays.has(scheduledDay.date)
                    );
                    const checkedEntriesFromDay = scheduledDaysFromMonth.filter((entry) =>
                        listSelectedDays.has(entry.date)
                    );
                    const isEveryEntryChecked = checkedEntriesFromDay.length === scheduledDaysFromMonth.length;

                    return (
                        <div
                            key={date}
                            className="border border-neutral-100"
                        >
                            <div className="z-40 flex items-center justify-between bg-[#fdfdfd] px-4 py-2 2xl:sticky 2xl:top-10">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        onCheckedChange={(isChecked) =>
                                            setListSelectedDays((prevListSelectedDays) => {
                                                const newListSelectedDays = new Set(prevListSelectedDays);
                                                scheduledDaysFromMonth.forEach((scheduledDay) => {
                                                    if (!isChecked) {
                                                        newListSelectedDays.delete(scheduledDay.date);
                                                    } else {
                                                        newListSelectedDays.add(scheduledDay.date);
                                                    }
                                                });
                                                return newListSelectedDays;
                                            })
                                        }
                                        checked={isEveryEntryChecked}
                                    />
                                    <p className="font-medium">
                                        {format(groupDate, "LLLL yyyy 'r.'", {
                                            locale: pl,
                                        })}
                                    </p>
                                </div>
                                {isAnySchedulesDayChecked && (
                                    <Button
                                        variant="ghost"
                                        className="p-0 font-bold text-red-400 hover:text-red-500"
                                        size="sm"
                                        onClick={() => handleDeleteAppointmentsFromMonth(scheduledDaysFromMonth)}
                                    >
                                        {t.deleteSelectedThisMonth}
                                    </Button>
                                )}
                            </div>
                            {scheduledDaysFromMonth.map((details) => (
                                <div
                                    key={details.date}
                                    className="grid grid-cols-1 px-4 py-2 hover:bg-neutral-50 2xl:grid-cols-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            onCheckedChange={() =>
                                                setListSelectedDays((prevListSelectedDays) => {
                                                    const newListSelectedDays = new Set(prevListSelectedDays);
                                                    if (newListSelectedDays.has(details.date)) {
                                                        newListSelectedDays.delete(details.date);
                                                    } else {
                                                        newListSelectedDays.add(details.date);
                                                    }
                                                    return newListSelectedDays;
                                                })
                                            }
                                            checked={listSelectedDays.has(details.date)}
                                        />
                                        <p className="font-medium text-neutral-600">{format(details.date, 'dd')}</p>
                                        <p className="text-sm">{format(details.date, "'('cccc')'", { locale: pl })}</p>
                                    </div>
                                    <div className="flex justify-self-start">
                                        <p className="2xl:hidden">{t.appointmentsCount}: </p>
                                        <p>{details.appointmentsPerDay}</p>
                                    </div>
                                    <div className="flex items-center gap-2 justify-self-start">
                                        <p className="2xl:hidden">{t.workTime}: </p>
                                        <p className="font-medium text-neutral-600">{`${format(details.startTime, 'HH:mm', { locale: pl })}  - ${format(details.endTime, 'HH:mm', { locale: pl })}`}</p>
                                        <p className="text-sm">
                                            ({formatDuration(details.workdayDuration, { locale: pl })})
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 2xl:justify-self-end">
                                        <p className="2xl:hidden">{t.durationOfAppointment}: </p>
                                        <p className="font-medium text-neutral-600">{details.meetingDuration} min.</p>
                                        <p className="text-sm">
                                            ({details.meetingInterval} min. {t.breaks})
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ScheduleSummary;
