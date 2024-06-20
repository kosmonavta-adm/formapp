'use client';

import { AnimationControls } from 'framer-motion';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type ScheduleContext = {
    allDatesBetween: Date[];
    currentDate: Date;
    endDate: Date;
    presetEndDate: string;
    setPresetEndDate: Dispatch<SetStateAction<string>>;
    calendarEndDate: Date | undefined;
    setCalendarEndDate: Dispatch<SetStateAction<Date | undefined>>;
    selectedDates: Date[];
    setSelectedDates: Dispatch<SetStateAction<Date[]>>;
    controls: AnimationControls;
};

export const ScheduleContext = createContext<ScheduleContext | null>(null);

export default function ScheduleProvider({ children, value }: { children: React.ReactNode; value: ScheduleContext }) {
    return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
}

export const useScheduleContext = () => {
    const context = useContext(ScheduleContext);

    if (!context) {
        throw new Error('useScheduleContext must be used inside the ScheduleProvider');
    }

    return context;
};
