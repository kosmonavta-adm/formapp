'use client';
import { addMonths, endOfMonth, endOfYear, format, isAfter } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { PHASE } from '@/components/schedule/_scheduleUtils';
import { ScheduleSchemaRevived } from '@/components/schedule/queries/_scheduleQueriesUtils';
import ScheduleName from '@/components/schedule/ScheduleName';
import ScheduleScreenContainer from '@/components/schedule/ScheduleScreenContainer';
import ScheduleWizardDayEdit, { ScheduleDays } from '@/components/schedule/ScheduleWizardDayEdit';
import ScheduleWizardRangeEdit from '@/components/schedule/ScheduleWizardRangeEdit';
import { cxTw } from '@/utils/utils';

type ScheduleEditorProps = {
    scheduleData?: ScheduleSchemaRevived;
    inEditMode: boolean;
};

const ScheduleWizard = ({ scheduleData, inEditMode }: ScheduleEditorProps) => {
    const [scheduleName, setScheduleName] = useState(scheduleData?.name ?? '');
    const [phase, setPhase] = useState<keyof typeof PHASE>(PHASE.SCHEDULE_NAME);
    const handlePhaseChange = (phase: keyof typeof PHASE) => setPhase(phase);
    const currentDate = new Date();

    const handleScheduleName = (value: string) => setScheduleName(value);

    const checkIsDatePreset = (date: string) => {
        if (format(date, 'yyyy-MM-dd') === format(endOfMonth(currentDate), 'yyyy-MM-dd')) {
            return true;
        } else if (format(date, 'yyyy-MM-dd') === format(endOfMonth(addMonths(currentDate, 1)), 'yyyy-MM-dd')) {
            return true;
        } else if (format(date, 'yyyy-MM-dd') === format(endOfYear(currentDate), 'yyyy-MM-dd')) {
            return true;
        } else return false;
    };

    const isDataPreset =
        scheduleData !== null && scheduleData !== undefined ? checkIsDatePreset(scheduleData.endDate) : false;

    const [presetEndDate, setPresetEndDate] = useState<string>(
        isDataPreset && scheduleData !== null && scheduleData !== undefined
            ? format(scheduleData.endDate, 'yyyy-MM-dd')
            : format(endOfMonth(currentDate), 'yyyy-MM-dd')
    );
    const [calendarEndDate, setCalendarEndDate] = useState<Date | undefined>(
        isDataPreset || scheduleData === null || scheduleData === undefined ? undefined : new Date(scheduleData.endDate)
    );

    const endDate =
        presetEndDate?.length === 0 && calendarEndDate !== undefined ? calendarEndDate : new Date(presetEndDate);

    const scheduleAsMap =
        scheduleData?.data === undefined
            ? new Map()
            : scheduleData.data.reduce<ScheduleDays>((result, item) => {
                  if (isAfter(item.endTime, endDate)) return result;

                  result.set(item.date, item);

                  return result;
              }, new Map());

    return (
        <motion.div
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className={cxTw('relative grid min-h-svh grid-cols-1 overflow-x-hidden')}
        >
            <AnimatePresence
                initial={false}
                mode="popLayout"
            >
                {phase === PHASE.SCHEDULE_NAME && (
                    <ScheduleScreenContainer asChild>
                        <motion.div
                            className="absolute inset-0"
                            initial={{ x: '-100vw' }}
                            animate={{ x: '0vw' }}
                            exit={{ x: '-100vw' }}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            <ScheduleName
                                handlePhaseChange={handlePhaseChange}
                                handleScheduleName={handleScheduleName}
                                scheduleName={scheduleName}
                            />
                        </motion.div>
                    </ScheduleScreenContainer>
                )}
            </AnimatePresence>
            <AnimatePresence
                initial={false}
                mode="popLayout"
            >
                {phase === PHASE.EDIT_SCHEDULE_RANGE && (
                    <ScheduleScreenContainer asChild>
                        <motion.div
                            className="absolute inset-0"
                            initial={{ x: '100vw' }}
                            animate={{ x: '0vw' }}
                            exit={{ x: '100vw' }}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            <ScheduleWizardRangeEdit
                                currentDate={currentDate}
                                setCalendarEndDate={setCalendarEndDate}
                                calendarEndDate={calendarEndDate}
                                presetEndDate={presetEndDate}
                                setPresetEndDate={setPresetEndDate}
                                handlePhaseChange={handlePhaseChange}
                            />
                        </motion.div>
                    </ScheduleScreenContainer>
                )}
            </AnimatePresence>
            <AnimatePresence
                initial={false}
                mode="popLayout"
            >
                {phase === PHASE.EDIT_SCHEDULE_DAY && (
                    <ScheduleScreenContainer asChild>
                        <motion.div
                            className="absolute inset-0"
                            initial={{ x: '100vw' }}
                            animate={{ x: '0vw' }}
                            exit={{ x: '100vw' }}
                            transition={{ duration: 0.3, type: 'spring' }}
                        >
                            <ScheduleWizardDayEdit
                                endDate={endDate}
                                currentDate={currentDate}
                                scheduleAsMap={scheduleAsMap}
                                scheduleData={scheduleData}
                                handlePhaseChange={handlePhaseChange}
                                inEditMode={inEditMode}
                                scheduleName={scheduleName}
                            />
                        </motion.div>
                    </ScheduleScreenContainer>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ScheduleWizard;
