'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import CreateFormPart from '@/components/forms/CreateFormPart';
import EditFormPart from '@/components/forms/EditFormPart';
import FormBuilderProvider, { Blueprints } from '@/components/forms/FormBuilderProvider';
import FormNameProvider from '@/components/forms/FormNameProvider';
import FormVisualizer from '@/components/forms/FormVisualizer';
import IsEditModeOnProvider from '@/components/forms/IsEditModeOnProvider';
import { Input } from '@/components/ui/Input';

type FormBuilderProps = {
    blueprint?: Blueprints[];
};

const FormBuilder = ({ blueprint }: FormBuilderProps) => {
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [formName, setFormName] = useState('');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="mx-auto flex w-full max-w-screen-lg flex-col"
        >
            <h1 className="mb-8 text-balance text-center text-4xl font-semibold">Edytor formularza</h1>
            <Input
                label={{ value: 'Nazwa formularza' }}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
            />
            <div className="grid w-full grid-cols-[360px,1fr] gap-8 py-16">
                <FormBuilderProvider componentsBlueprints={blueprint}>
                    <FormNameProvider value={{ formName, setFormName }}>
                        <IsEditModeOnProvider value={{ isEditModeOn, setIsEditModeOn }}>
                            {isEditModeOn ? <EditFormPart /> : <CreateFormPart />}
                            <FormVisualizer />
                        </IsEditModeOnProvider>
                    </FormNameProvider>
                </FormBuilderProvider>
            </div>
        </motion.div>
    );
};

export default FormBuilder;
