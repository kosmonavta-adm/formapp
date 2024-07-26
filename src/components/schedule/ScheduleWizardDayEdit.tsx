import { Duration, formatISO, startOfMinute } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useUpdateCustomerFormMutation } from '@/components/customerForm/queries/updateCustomerForm.client';
import { ArrowLeft } from '@/components/icons';
import { useGetProfileQuery } from '@/components/profile/getProfile.client';
import { PHASE } from '@/components/schedule/_scheduleUtils';
import DailySchedule from '@/components/schedule/DailySchedule';
import { ScheduleSchemaRevived } from '@/components/schedule/queries/_scheduleQueriesUtils';
import { useCreateScheduleMutation } from '@/components/schedule/queries/createSchedule.mutation.client';
import { useUpdateScheduleMutation } from '@/components/schedule/queries/updateSchedule.client';
import ScheduleCalendarEditor from '@/components/schedule/ScheduleCalendarEditor';
import ScheduleSummary from '@/components/schedule/ScheduleSummary';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast/useToast';
import ScheduleEditorDict from '@/dictionaries/ScheduleEditorDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { cxTw, url } from '@/utils/utils';

export type ScheduleDay = {
    meetingDuration: number;
    meetingInterval: number;
    startTime: string;
    endTime: string;
    appointmentsPerDay: number;
    workdayDuration: Duration;
    date: string;
};

export type ScheduleDays = Map<string, ScheduleDay>;

type ScheduleWizardDayEditProps = {
    currentDate: Date;
    endDate: Date;
    scheduleAsMap: ScheduleDays;
    scheduleData?: ScheduleSchemaRevived;
    handlePhaseChange: (phase: keyof typeof PHASE) => void;
    inEditMode: boolean;
    scheduleName: string;
};

const ScheduleWizardDayEdit = ({
    endDate,
    scheduleName,
    currentDate,
    handlePhaseChange,
    scheduleAsMap,
    scheduleData,
    inEditMode,
}: ScheduleWizardDayEditProps) => {
    const { data: profile } = useGetProfileQuery();

    const [selectedDays, setSelectedDays] = useState<Date[]>([new Date()]);
    const [scheduledDays, setScheduledDays] = useState<ScheduleDays>(scheduleAsMap);

    const { toast } = useToast();

    const router = useRouter();

    const locale = useLocaleContext();

    const t = ScheduleEditorDict[locale];

    const isAnyScheduledDay = scheduledDays.size > 0;
    const createSchedule = useCreateScheduleMutation();
    const updateSchedule = useUpdateScheduleMutation();
    const updateCustomerForm = useUpdateCustomerFormMutation();

    const handleSaveScheduledDays = async () => {
        const convertScheduledDaysToJSON = JSON.stringify(
            Array.from(scheduledDays.entries()).reduce<(ScheduleDay & { date: string })[]>(
                (result, [date, scheduledDay]) => {
                    const newScheduleDay = {
                        ...scheduledDay,
                        date: formatISO(startOfMinute(date)),
                    };
                    result.push(newScheduleDay);

                    return result;
                },
                []
            )
        );

        const newData = {
            data: convertScheduledDaysToJSON,

            start_date: formatISO(startOfMinute(currentDate)),
            end_date: formatISO(startOfMinute(endDate)),
        };

        if (inEditMode) {
            if (scheduleData === undefined) {
                throw new Error('scheduleData is undefined');
            }
            updateSchedule.mutate({ data: newData, name: scheduleName, id: scheduleData.id });
            updateCustomerForm.mutate({
                customerFormData: { schedule_data: newData, name: scheduleName },
                subdomain: profile.data?.subdomain,
            });
        } else {
            createSchedule.mutate({
                ...newData,
                name: scheduleName,
                is_published: false,
            });
        }
    };

    useEffect(() => {
        if (createSchedule.isSuccess) {
            toast({ description: t.scheduleAdded });
            router.replace(url.schedules);
        } else if (createSchedule.isError) {
            toast({ description: t.errorWhileAddingSchedule });
            router.replace(url.schedules);
        }
    }, [createSchedule.status]);

    useEffect(() => {
        if (updateSchedule.isSuccess) {
            toast({ description: t.scheduleAdded });
            router.replace(url.schedules);
        } else if (updateSchedule.isError) {
            toast({ description: t.errorWhileAddingSchedule });
            router.replace(url.schedules);
        }
    }, [updateSchedule.status]);

    return (
        <div className={cxTw('mx-auto flex w-full max-w-screen-3xl flex-col gap-16 px-8 py-16 xl:px-16')}>
            <p className="mx-auto mb-4 text-4xl font-bold">{t.editSchedule}</p>

            <Button
                className="p-0"
                variant="ghost"
                onClick={() => {
                    handlePhaseChange(PHASE.EDIT_SCHEDULE_RANGE);
                }}
            >
                <ArrowLeft className="h-4" />
                {t.returnToEditRange}
            </Button>

            <div className="mx-auto grid grid-cols-1 gap-16 lg:grid-cols-[360px,max-content]">
                <DailySchedule
                    selectedDays={selectedDays}
                    setScheduledDays={setScheduledDays}
                    setSelectedDays={setSelectedDays}
                />
                <ScheduleCalendarEditor
                    endDate={endDate}
                    scheduledDays={scheduledDays}
                    setScheduledDays={setScheduledDays}
                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays}
                    currentDate={currentDate}
                />
            </div>
            <AnimatePresence>
                {isAnyScheduledDay && (
                    <motion.div
                        className="flex w-full flex-col gap-4"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ duration: 0.3, type: 'spring' }}
                    >
                        <ScheduleSummary
                            scheduledDays={scheduledDays}
                            setScheduledDays={setScheduledDays}
                        />
                        <Button
                            size="lg"
                            className="mx-auto"
                            onClick={handleSaveScheduledDays}
                        >
                            {t.save}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScheduleWizardDayEdit;
