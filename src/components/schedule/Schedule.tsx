'use client';
import { endOfMonth, format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import ScheduleDuration from '@/components/schedule/ScheduleDuration';
import ScheduleEditor from '@/components/schedule/ScheduleEditor';
import ScheduleScreenContainer from '@/components/schedule/ScheduleScreenContainer';
import { cxTw } from '@/utils/utils';

const Schedule = () => {
    const currentDate = new Date();

    const [presetEndDate, setPresetEndDate] = useState<string>(format(endOfMonth(currentDate), 'yyyy-MM-dd'));
    const [calendarEndDate, setCalendarEndDate] = useState<Date | undefined>(undefined);
    const [phase, setPhase] = useState(1);

    const endDate =
        presetEndDate?.length === 0 && calendarEndDate !== undefined ? calendarEndDate : new Date(presetEndDate);

    return (
        <div className={cxTw('relative grid min-h-svh grid-cols-1 overflow-x-hidden')}>
            <AnimatePresence
                initial={false}
                mode="popLayout"
            >
                {phase === 1 && (
                    <ScheduleScreenContainer asChild>
                        <motion.div
                            className="absolute inset-0"
                            initial={{ x: '-100vw' }}
                            animate={{ x: '0vw' }}
                            exit={{ x: '-100vw' }}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            <ScheduleDuration
                                currentDate={currentDate}
                                setCalendarEndDate={setCalendarEndDate}
                                calendarEndDate={calendarEndDate}
                                presetEndDate={presetEndDate}
                                setPresetEndDate={setPresetEndDate}
                                setPhase={setPhase}
                            />
                        </motion.div>
                    </ScheduleScreenContainer>
                )}
            </AnimatePresence>
            <AnimatePresence
                initial={false}
                mode="popLayout"
            >
                {phase === 2 && (
                    <ScheduleScreenContainer asChild>
                        <motion.div
                            className="absolute inset-0"
                            initial={{ x: '100vw' }}
                            animate={{ x: '0vw' }}
                            exit={{ x: '100vw' }}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            <ScheduleEditor
                                endDate={endDate}
                                currentDate={currentDate}
                                setPhase={setPhase}
                            />
                        </motion.div>
                    </ScheduleScreenContainer>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Schedule;
