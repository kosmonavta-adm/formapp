'use client';

import { motion } from 'framer-motion';

import ComponentSettings from '@/components/forms/ComponentSettings';
import FormBuilderProvider, { Blueprints } from '@/components/forms/FormBuilderProvider';
import FormComponents from '@/components/forms/FormComponents';
import FormVisualizer from '@/components/forms/FormVisualizer';

type FormBuilderProps = {
    blueprint?: Blueprints[];
};

const FormBuilder = ({ blueprint }: FormBuilderProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="flex flex-col"
        >
            <FormBuilderProvider componentsBlueprints={blueprint}>
                <div className="grid grid-cols-[1fr,380px]">
                    <FormVisualizer />
                    <FormComponents />
                    <ComponentSettings />
                </div>
            </FormBuilderProvider>
        </motion.div>
    );
};

export default FormBuilder;
