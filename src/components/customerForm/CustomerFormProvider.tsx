'use client';

import { AnimationControls } from 'framer-motion';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type CustomerFormContext = {
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

export const customerFormContext = createContext<CustomerFormContext | null>(null);

export default function CustomerFormProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: CustomerFormContext;
}) {
    return <customerFormContext.Provider value={value}>{children}</customerFormContext.Provider>;
}

export const useCustomerFormProvider = () => {
    const context = useContext(customerFormContext);

    if (!context) {
        throw new Error('useCustomerFormProvider must be used inside the CustomerFormProvider');
    }

    return context;
};
