'use client';

import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type FormNameContextState = {
    formName: string;
    setFormName: Dispatch<SetStateAction<string>>;
};

export const FormNameContext = createContext<FormNameContextState | null>(null);

export default function FormNameProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: FormNameContextState;
}) {
    return <FormNameContext.Provider value={value}>{children}</FormNameContext.Provider>;
}

export const useFormNameContext = () => {
    const context = useContext(FormNameContext);

    if (!context) {
        throw new Error('useFormNameContext must be used inside the FormNameProvider');
    }

    return context;
};
