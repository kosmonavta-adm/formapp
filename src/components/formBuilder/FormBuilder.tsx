'use client';

import { useState } from 'react';

import CreateFormPart from '@/components/formBuilder/CreateFormPart';
import EditFormPart from '@/components/formBuilder/EditFormPart';
import FormBuilderProvider from '@/components/formBuilder/FormBuilderProvider';
import FormNameProvider from '@/components/formBuilder/FormNameProvider';
import FormVisualizer from '@/components/formBuilder/FormVisualizer';
import IsEditModeOnProvider from '@/components/formBuilder/IsEditModeOnProvider';
import { Input } from '@/components/ui/Input';

const FormBuilder = () => {
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [formName, setFormName] = useState('');

    return (
        <div className="mx-auto flex w-full max-w-screen-lg flex-col">
            <h1 className="mb-8 text-balance text-center text-4xl font-semibold">Edytor formularza</h1>
            <Input
                label={{ value: 'Nazwa formularza' }}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
            />
            <div className="grid w-full grid-cols-[360px,1fr] gap-8 py-16">
                <FormBuilderProvider>
                    <FormNameProvider value={{ formName, setFormName }}>
                        <IsEditModeOnProvider value={{ isEditModeOn, setIsEditModeOn }}>
                            {isEditModeOn ? <EditFormPart /> : <CreateFormPart />}
                            <FormVisualizer />
                        </IsEditModeOnProvider>
                    </FormNameProvider>
                </FormBuilderProvider>
            </div>
        </div>
    );
};

export default FormBuilder;
