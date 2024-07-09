import { AnimatePresence, motion } from 'framer-motion';

import { useFormBuilderDispatchContext, useFormBuilderStateContext } from '@/components/forms/FormBuilderProvider';
import InputSchemaSettings from '@/components/forms/InputSchemaSettings';
import SelectSchemaSettings from '@/components/forms/SelectSchemaSettings';
import { X } from '@/components/icons';

const ComponentSettings = () => {
    const { selectedBlueprint } = useFormBuilderStateContext();
    const { updateBlueprint: updateBlueprint, setSelectedBlueprint } = useFormBuilderDispatchContext();

    const isComponentSelected = selectedBlueprint !== undefined;

    const isSelect = selectedBlueprint?.component === 'Select';
    const isInput = selectedBlueprint?.component === 'Input';

    const handleCloseSettings = () => setSelectedBlueprint(undefined);

    return (
        <AnimatePresence mode="wait">
            {isComponentSelected && (
                <motion.div
                    key={selectedBlueprint?.dataId}
                    initial={{ right: '-448px' }}
                    animate={{ right: '0%' }}
                    exit={{ right: '-448px' }}
                    transition={{ duration: 0.15, type: 'tween' }}
                    className="fixed bottom-0 right-0 top-0 min-h-svh w-full max-w-md border-l border-l-neutral-100 bg-white p-4"
                >
                    <div className="flex items-center justify-between">
                        <p className="mb-2 font-bold">Ustawienia</p>
                        <button
                            className="ml-auto flex"
                            onClick={handleCloseSettings}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {isSelect && (
                        <SelectSchemaSettings
                            defaultValues={selectedBlueprint}
                            handleSuccessSubmit={(data) => {
                                const newBlueprint = structuredClone(selectedBlueprint);
                                newBlueprint.settings = {
                                    ...newBlueprint.settings,
                                    ...data,
                                };

                                updateBlueprint(newBlueprint);
                            }}
                        />
                    )}
                    {isInput && (
                        <InputSchemaSettings
                            handleSuccessSubmit={(data) => {
                                const newBlueprint = structuredClone(selectedBlueprint);
                                newBlueprint.settings = {
                                    ...newBlueprint.settings,
                                    ...data,
                                };

                                updateBlueprint(newBlueprint);
                            }}
                            defaultValues={selectedBlueprint}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ComponentSettings;
