import { Duration } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { createClient } from '@/auth/client';
import { ArrowLeft } from '@/components/icons';
import DailySchedule from '@/components/schedule/DailySchedule';
import { useCreateScheduleMutation } from '@/components/schedule/schedule.mutations';
import ScheduleCalendar from '@/components/schedule/ScheduleCalendar';
import ScheduleSummary from '@/components/schedule/ScheduleSummary';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast/useToast';
import ScheduleEditorDict from '@/dictionaries/ScheduleEditorDict.json';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { cxTw } from '@/utils/utils';

export type ScheduleDay = {
    meetingDuration: number;
    meetingInterval: number;
    startTime: Date;
    endTime: Date;
    appointmentsPerDay: number;
    workdayDuration: Duration;
};
export type ScheduleDays = Map<string, ScheduleDay>;

type ScheduleEditorProps = {
    currentDate: Date;
    endDate: Date;
    setPhase: Dispatch<SetStateAction<number>>;
};

const ScheduleEditor = ({ endDate, currentDate, setPhase }: ScheduleEditorProps) => {
    const [selectedDays, setSelectedDays] = useState<Date[]>([]);
    const [scheduledDays, setScheduledDays] = useState<ScheduleDays>(new Map());

    const { toast } = useToast();

    const locale = useLocaleContext();

    const t = ScheduleEditorDict[locale];

    const isAnyScheduledDay = scheduledDays.size > 0;
    const createSchedule = useCreateScheduleMutation();

    const handleSaveScheduledDays = async () => {
        const supabase = createClient();
        const user = await supabase.auth.getSession();
        const authId = user.data.session?.user.id;
        const convertScheduledDaysToJSON = JSON.stringify(
            Array.from(scheduledDays.entries()).reduce<(ScheduleDay & { date: string })[]>(
                (result, [date, scheduledDay]) => {
                    const newScheduleDay = {
                        ...scheduledDay,
                        date,
                    };
                    result.push(newScheduleDay);

                    return result;
                },
                []
            )
        );
        createSchedule.mutate({ user_id: authId, data: convertScheduledDaysToJSON });
    };

    useEffect(() => {
        if (createSchedule.isSuccess) {
            toast({ description: t.scheduleAdded });
        } else if (createSchedule.isError) {
            toast({ description: t.errorWhileAddingSchedule });
        }
    }, [createSchedule.status]);

    return (
        <div className={cxTw('mx-auto flex w-full max-w-screen-3xl flex-col gap-16 px-8 py-16 xl:px-16')}>
            <p className="mx-auto mb-4 text-4xl font-bold">{t.editSchedule}</p>

            <Button
                className="p-0"
                variant="ghost"
                onClick={() => {
                    setPhase(1);
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
                <ScheduleCalendar
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

export default ScheduleEditor;
